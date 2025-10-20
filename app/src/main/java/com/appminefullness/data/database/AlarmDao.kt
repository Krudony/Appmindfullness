package com.appminefullness.data.database

import androidx.room.*
import kotlinx.coroutines.flow.Flow
import com.appminefullness.data.models.AlarmEntity

@Dao
interface AlarmDao {
    @Query("SELECT * FROM alarms ORDER BY hour, minute")
    fun getAllAlarms(): Flow<List<AlarmEntity>>

    @Query("SELECT * FROM alarms WHERE id = :id")
    suspend fun getAlarmById(id: Long): AlarmEntity?

    @Query("SELECT * FROM alarms WHERE isEnabled = 1 ORDER BY hour, minute")
    fun getEnabledAlarms(): Flow<List<AlarmEntity>>

    @Query("SELECT * FROM alarms WHERE hour = :hour AND minute = :minute AND isEnabled = 1")
    suspend fun getAlarmsForTime(hour: Int, minute: Int): List<AlarmEntity>

    @Insert
    suspend fun insertAlarm(alarm: AlarmEntity): Long

    @Update
    suspend fun updateAlarm(alarm: AlarmEntity)

    @Delete
    suspend fun deleteAlarm(alarm: AlarmEntity)

    @Query("DELETE FROM alarms WHERE id = :id")
    suspend fun deleteAlarmById(id: Int)

    @Query("UPDATE alarms SET isEnabled = :enabled WHERE id = :id")
    suspend fun toggleAlarm(id: Long, enabled: Boolean)
}