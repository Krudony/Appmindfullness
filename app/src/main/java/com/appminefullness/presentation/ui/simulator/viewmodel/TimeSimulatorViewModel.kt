package com.appminefullness.presentation.ui.simulator.viewmodel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.appminefullness.AppMinefullnessApplication
import com.appminefullness.utils.TimeSimulator
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class TimeSimulatorViewModel(application: Application) : AndroidViewModel(application) {

    private val timeSimulator = (application as AppMinefullnessApplication).timeSimulator

    // Expose TimeSimulator state flows
    val currentTime: StateFlow<java.time.LocalTime> = timeSimulator.currentTime
    val currentDate: StateFlow<java.time.LocalDate> = timeSimulator.currentDate
    val speedMultiplier: StateFlow<Int> = timeSimulator.speedMultiplier
    val isAutoMode: StateFlow<Boolean> = timeSimulator.isAutoMode
    val eventLogs: StateFlow<List<String>> = timeSimulator.eventLogs

    fun toggleAutoMode() {
        timeSimulator.toggleAutoMode()
    }

    fun pauseSimulation() {
        timeSimulator.toggleAutoMode() // Toggle to pause
    }

    fun stopSimulation() {
        viewModelScope.launch {
            timeSimulator.toggleAutoMode() // Stop auto mode
            timeSimulator.quickJumpToNow() // Reset to now
        }
    }

    fun resetToCurrentTime() {
        timeSimulator.quickJumpToNow()
    }

    fun setManualTime(hour: Int, minute: Int) {
        if (hour in 0..23 && minute in 0..59) {
            timeSimulator.setManualTime(hour, minute)
        }
    }

    fun setSpeed(multiplier: Int) {
        if (TimeSimulator.SUPPORTED_SPEEDS.contains(multiplier)) {
            timeSimulator.setSpeed(multiplier)
        }
    }

    // Quick jump functions (ตาม Issue #7)
    fun quickJumpToMorning() {
        timeSimulator.quickJumpToMorning()
    }

    fun quickJumpToNoon() {
        timeSimulator.quickJumpToNoon()
    }

    fun quickJumpToEvening() {
        timeSimulator.quickJumpToEvening()
    }

    fun quickJumpToMidnight() {
        timeSimulator.quickJumpToMidnight()
    }

    fun quickJumpToStartOfDay() {
        timeSimulator.quickJumpToStartOfDay()
    }

    fun quickJumpToNow() {
        timeSimulator.quickJumpToNow()
    }

    fun clearLogs() {
        timeSimulator.clearLogs()
    }

    override fun onCleared() {
        super.onCleared()
        // Clean up if needed
    }
}