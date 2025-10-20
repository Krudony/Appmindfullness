package com.appminefullness.data.database

import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import android.content.Context
import com.appminefullness.data.models.AlarmEntity
import com.appminefullness.data.models.SettingsEntity

@Database(
    entities = [AlarmEntity::class, SettingsEntity::class],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {
    abstract fun alarmDao(): AlarmDao
    abstract fun settingsDao(): SettingsDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "appminefullness_database"
                )
                .fallbackToDestructiveMigration() // สำหรับการพัฒนา
                .build()
                INSTANCE = instance
                instance
            }
        }
    }
}