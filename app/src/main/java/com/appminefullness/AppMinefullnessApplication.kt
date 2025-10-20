package com.appminefullness

import android.app.Application
import com.appminefullness.data.database.AppDatabase
import com.appminefullness.utils.TimeSimulator

class AppMinefullnessApplication : Application() {
    val database: AppDatabase by lazy { AppDatabase.getDatabase(this) }
    val timeSimulator: TimeSimulator by lazy { TimeSimulator() }

    override fun onCreate() {
        super.onCreate()

        // ตั้งค่า TimeSimulator ให้ตรวจสอบ alarms ทุกครั้งที่เวลาเปลี่ยน
        timeSimulator.setOnAlarmCheckListener { time ->
            // TODO: Implement alarm checking logic
            checkAlarmsForTime(time.hour, time.minute)
        }
    }

    private fun checkAlarmsForTime(hour: Int, minute: Int) {
        // TODO: Implement alarm checking when time matches
        // This will be used by TimeSimulator to trigger alarms
    }
}