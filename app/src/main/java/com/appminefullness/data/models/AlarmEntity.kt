package com.appminefullness.data.models

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.DayOfWeek
import java.time.LocalDateTime

@Entity(tableName = "alarms")
data class AlarmEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String, // ชื่อภาษาไทย
    val hour: Int,
    val minute: Int,
    val days: Set<DayOfWeek>,
    val bellSound: String, // ประเภทระฆังวัดไทย
    val vibrationEnabled: Boolean = true,
    val isEnabled: Boolean = true,
    val createdAt: Long = System.currentTimeMillis()
)