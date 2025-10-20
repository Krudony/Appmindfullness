package com.appminefullness.presentation.ui.simulator

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.appminefullness.databinding.ActivityTimeSimulatorBinding
import com.appminefullness.presentation.ui.simulator.viewmodel.TimeSimulatorViewModel
import kotlinx.coroutines.launch

class TimeSimulatorActivity : AppCompatActivity() {

    private lateinit var binding: ActivityTimeSimulatorBinding
    private val viewModel: TimeSimulatorViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityTimeSimulatorBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        setupObservers()
    }

    private fun setupUI() {
        // ตั้งค่า Toolbar
        binding.toolbar.setNavigationOnClickListener {
            finish()
        }

        // ปุ่มเล่น/หยุด
        binding.buttonPlay.setOnClickListener {
            viewModel.toggleAutoMode()
        }

        binding.buttonPause.setOnClickListener {
            viewModel.pauseSimulation()
        }

        binding.buttonStop.setOnClickListener {
            viewModel.stopSimulation()
        }

        binding.buttonReset.setOnClickListener {
            viewModel.resetToCurrentTime()
        }

        // ปุ่มกระโดดเวลา
        binding.buttonMorning.setOnClickListener {
            viewModel.quickJumpToMorning()
        }

        binding.buttonNoon.setOnClickListener {
            viewModel.quickJumpToNoon()
        }

        binding.buttonEvening.setOnClickListener {
            viewModel.quickJumpToEvening()
        }

        binding.buttonMidnight.setOnClickListener {
            viewModel.quickJumpToMidnight()
        }

        binding.buttonStartOfDay.setOnClickListener {
            viewModel.quickJumpToStartOfDay()
        }

        binding.buttonNow.setOnClickListener {
            viewModel.quickJumpToNow()
        }

        // ปุ่มความเร็ว
        binding.buttonSpeed1x.setOnClickListener {
            viewModel.setSpeed(1)
        }

        binding.buttonSpeed10x.setOnClickListener {
            viewModel.setSpeed(10)
        }

        binding.buttonSpeed60x.setOnClickListener {
            viewModel.setSpeed(60)
        }

        binding.buttonSpeed100x.setOnClickListener {
            viewModel.setSpeed(100)
        }

        // ตั้งเวลาด้วยตนเอง
        binding.buttonSetTime.setOnClickListener {
            val hour = binding.editTextHour.text.toString().toIntOrNull() ?: 0
            val minute = binding.editTextMinute.text.toString().toIntOrNull() ?: 0
            viewModel.setManualTime(hour, minute)
        }

        // ปุ่มล้าง logs
        binding.buttonClearLogs.setOnClickListener {
            viewModel.clearLogs()
        }
    }

    private fun setupObservers() {
        lifecycleScope.launch {
            viewModel.currentTime.collect { time ->
                binding.textViewTime.text = String.format("%02d:%02d:%02d", time.hour, time.minute, time.second)
            }
        }

        lifecycleScope.launch {
            viewModel.currentDate.collect { date ->
                binding.textViewDate.text = formatThaiDate(date)
            }
        }

        lifecycleScope.launch {
            viewModel.speedMultiplier.collect { speed ->
                binding.textViewSpeed.text = "${speed}x"
                updateSpeedButtons(speed)
            }
        }

        lifecycleScope.launch {
            viewModel.isAutoMode.collect { isAuto ->
                updatePlayPauseButton(isAuto)
                binding.switchAutoMode.isChecked = isAuto
            }
        }

        lifecycleScope.launch {
            viewModel.eventLogs.collect { logs ->
                binding.textViewLogs.text = logs.joinToString("\n")
            }
        }
    }

    private fun formatThaiDate(date: java.time.LocalDate): String {
        val thaiMonths = listOf(
            "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
            "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม",
            "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
        )

        val thaiYear = date.year + 543
        val month = thaiMonths[date.monthValue - 1]
        val day = date.dayOfMonth

        val thaiDays = listOf(
            "อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"
        )
        val dayName = thaiDays[date.dayOfWeek.value % 7]

        return "วัน$dayName $day $month $thaiYear"
    }

    private fun updatePlayPauseButton(isAuto: Boolean) {
        if (isAuto) {
            binding.buttonPlay.visibility = android.view.View.GONE
            binding.buttonPause.visibility = android.view.View.VISIBLE
        } else {
            binding.buttonPlay.visibility = android.view.View.VISIBLE
            binding.buttonPause.visibility = android.view.View.GONE
        }
    }

    private fun updateSpeedButtons(speed: Int) {
        // รีเซ็ตสถานะปุ่มทั้งหมด
        listOf(
            binding.buttonSpeed1x,
            binding.buttonSpeed10x,
            binding.buttonSpeed60x,
            binding.buttonSpeed100x
        ).forEach { button ->
            button.setBackgroundColor(getColor(android.R.color.transparent))
        }

        // เลือกปุ่มที่ถูกต้อง
        when (speed) {
            1 -> binding.buttonSpeed1x.setBackgroundColor(getColor(android.R.color.holo_blue_light))
            10 -> binding.buttonSpeed10x.setBackgroundColor(getColor(android.R.color.holo_blue_light))
            60 -> binding.buttonSpeed60x.setBackgroundColor(getColor(android.R.color.holo_blue_light))
            100 -> binding.buttonSpeed100x.setBackgroundColor(getColor(android.R.color.holo_blue_light))
        }
    }
}