package com.appminefullness.presentation.ui.main.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.appminefullness.R
import com.appminefullness.data.models.AlarmEntity
import com.appminefullness.databinding.ItemAlarmBinding
import java.time.format.DateTimeFormatter
import java.time.DayOfWeek

class AlarmAdapter(
    private val onAlarmToggle: (AlarmEntity, Boolean) -> Unit,
    private val onAlarmClick: (AlarmEntity) -> Unit,
    private val onAlarmDelete: (AlarmEntity) -> Unit
) : ListAdapter<AlarmEntity, AlarmAdapter.AlarmViewHolder>(AlarmDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AlarmViewHolder {
        val binding = ItemAlarmBinding.inflate(
            LayoutInflater.from(parent.context),
            parent,
            false
        )
        return AlarmViewHolder(binding)
    }

    override fun onBindViewHolder(holder: AlarmViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class AlarmViewHolder(
        private val binding: ItemAlarmBinding
    ) : RecyclerView.ViewHolder(binding.root) {

        private val timeFormatter = DateTimeFormatter.ofPattern("HH:mm")

        fun bind(alarm: AlarmEntity) {
            // เวลา
            binding.textViewTime.text = String.format("%02d:%02d", alarm.hour, alarm.minute)

            // ชื่อ
            binding.textViewName.text = alarm.name

            // วันที่
            binding.textViewDays.text = formatDays(alarm.days)

            // เสียงระฆัง
            binding.textViewBellSound.text = alarm.bellSound

            // สถานะการเปิด/ปิด
            binding.switchAlarm.isChecked = alarm.isEnabled
            binding.switchAlarm.setOnCheckedChangeListener { _, isChecked ->
                onAlarmToggle(alarm, isChecked)
            }

            // การแสดงผลตามสถานะ
            if (alarm.isEnabled) {
                binding.cardView.alpha = 1.0f
                binding.textViewTime.setTextColor(binding.root.context.getColor(R.color.md_theme_light_onPrimary))
                binding.textViewName.setTextColor(binding.root.context.getColor(R.color.md_theme_light_onSurface))
                binding.textViewDays.setTextColor(binding.root.context.getColor(R.color.md_theme_light_onSurfaceVariant))
                binding.textViewBellSound.setTextColor(binding.root.context.getColor(R.color.md_theme_light_primary))
            } else {
                binding.cardView.alpha = 0.6f
                binding.textViewTime.setTextColor(binding.root.context.getColor(R.color.md_theme_light_onSurfaceVariant))
                binding.textViewName.setTextColor(binding.root.context.getColor(R.color.md_theme_light_onSurfaceVariant))
                binding.textViewDays.setTextColor(binding.root.context.getColor(R.color.md_theme_light_outline))
                binding.textViewBellSound.setTextColor(binding.root.context.getColor(R.color.md_theme_light_outline))
            }

            // Click listeners
            binding.root.setOnClickListener {
                onAlarmClick(alarm)
            }

            binding.buttonDelete.setOnClickListener {
                onAlarmDelete(alarm)
            }

            // Long click for additional options
            binding.root.setOnLongClickListener {
                // TODO: Show context menu with edit/delete options
                true
            }
        }

        private fun formatDays(days: Set<DayOfWeek>): String {
            return when {
                days.size == 7 -> binding.root.context.getString(R.string.every_day)
                days.size == 5 && !days.contains(DayOfWeek.SATURDAY) && !days.contains(DayOfWeek.SUNDAY) ->
                    binding.root.context.getString(R.string.weekdays)
                days.size == 2 && days.contains(DayOfWeek.SATURDAY) && days.contains(DayOfWeek.SUNDAY) ->
                    binding.root.context.getString(R.string.weekends)
                else -> {
                    val dayNames = mapOf(
                        DayOfWeek.MONDAY to binding.root.context.getString(R.string.monday),
                        DayOfWeek.TUESDAY to binding.root.context.getString(R.string.tuesday),
                        DayOfWeek.WEDNESDAY to binding.root.context.getString(R.string.wednesday),
                        DayOfWeek.THURSDAY to binding.root.context.getString(R.string.thursday),
                        DayOfWeek.FRIDAY to binding.root.context.getString(R.string.friday),
                        DayOfWeek.SATURDAY to binding.root.context.getString(R.string.saturday),
                        DayOfWeek.SUNDAY to binding.root.context.getString(R.string.sunday)
                    )

                    // เรียงวันตามลำดับจันทร์-อาทิตย์
                    val orderedDays = listOf(
                        DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY,
                        DayOfWeek.THURSDAY, DayOfWeek.FRIDAY, DayOfWeek.SATURDAY, DayOfWeek.SUNDAY
                    ).filter { it in days }

                    orderedDays.joinToString(", ") { dayNames[it] ?: it.toString() }
                }
            }
        }
    }

    private class AlarmDiffCallback : DiffUtil.ItemCallback<AlarmEntity>() {
        override fun areItemsTheSame(oldItem: AlarmEntity, newItem: AlarmEntity): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: AlarmEntity, newItem: AlarmEntity): Boolean {
            return oldItem == newItem
        }
    }
}