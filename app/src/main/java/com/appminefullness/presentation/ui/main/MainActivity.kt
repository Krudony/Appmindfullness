package com.appminefullness.presentation.ui.main

import android.content.Intent
import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import com.appminefullness.databinding.ActivityMainBinding
import com.appminefullness.presentation.ui.simulator.TimeSimulatorActivity
import com.appminefullness.presentation.ui.settings.SettingsActivity
import com.appminefullness.presentation.ui.main.adapters.AlarmAdapter
import com.appminefullness.presentation.ui.main.viewmodel.MainViewModel

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private val viewModel: MainViewModel by viewModels()
    private lateinit var alarmAdapter: AlarmAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        setupObservers()
        loadAlarms()
    }

    private fun setupUI() {
        // ตั้งค่า Toolbar
        binding.toolbar.title = getString(com.appminefullness.R.string.app_name)

        // ตั้งค่า RecyclerView
        alarmAdapter = AlarmAdapter(
            onAlarmToggle = { alarm, enabled ->
                viewModel.toggleAlarm(alarm.id, enabled)
            },
            onAlarmClick = { alarm ->
                // TODO: Open edit alarm dialog
            },
            onAlarmDelete = { alarm ->
                viewModel.deleteAlarm(alarm)
            }
        )

        binding.recyclerViewAlarms.apply {
            layoutManager = LinearLayoutManager(this@MainActivity)
            adapter = alarmAdapter
        }

        // ตั้งค่าปุ่ม
        binding.fabAddAlarm.setOnClickListener {
            // TODO: Open add alarm dialog
        }

        binding.buttonSettings.setOnClickListener {
            startActivity(Intent(this, SettingsActivity::class.java))
        }

        binding.buttonSimulator.setOnClickListener {
            startActivity(Intent(this, TimeSimulatorActivity::class.java))
        }
    }

    private fun setupObservers() {
        viewModel.alarms.observe(this) { alarms ->
            if (alarms.isEmpty()) {
                binding.recyclerViewAlarms.visibility = android.view.View.GONE
                binding.textViewNoAlarms.visibility = android.view.View.VISIBLE
                binding.textViewCreateFirstAlarm.setOnClickListener {
                    // TODO: Open add alarm dialog
                }
            } else {
                binding.recyclerViewAlarms.visibility = android.view.View.VISIBLE
                binding.textViewNoAlarms.visibility = android.view.View.GONE
                alarmAdapter.submitList(alarms)
            }
        }

        viewModel.isLoading.observe(this) { isLoading ->
            // TODO: Show/hide loading indicator
        }

        viewModel.errorMessage.observe(this) { errorMessage ->
            if (errorMessage.isNotEmpty()) {
                // TODO: Show error message (Snackbar/Toast)
            }
        }
    }

    private fun loadAlarms() {
        viewModel.loadAlarms()
    }

    override fun onResume() {
        super.onResume()
        loadAlarms()
    }
}