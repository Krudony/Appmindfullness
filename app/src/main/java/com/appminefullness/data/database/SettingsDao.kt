package com.appminefullness.data.database

import androidx.room.*
import kotlinx.coroutines.flow.Flow
import com.appminefullness.data.models.SettingsEntity

@Dao
interface SettingsDao {
    @Query("SELECT * FROM settings")
    fun getAllSettings(): Flow<List<SettingsEntity>>

    @Query("SELECT * FROM settings WHERE key = :key")
    suspend fun getSettingByKey(key: String): SettingsEntity?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSetting(setting: SettingsEntity)

    @Update
    suspend fun updateSetting(setting: SettingsEntity)

    @Delete
    suspend fun deleteSetting(setting: SettingsEntity)

    @Query("DELETE FROM settings WHERE key = :key")
    suspend fun deleteSettingByKey(key: String)
}