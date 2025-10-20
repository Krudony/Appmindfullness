package com.appminefullness.utils

import java.time.LocalTime
import java.time.LocalDate
import java.time.LocalDateTime
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

class TimeSimulator {
    private val _currentTime = MutableStateFlow(LocalTime.now())
    val currentTime: StateFlow<LocalTime> = _currentTime.asStateFlow()

    private val _currentDate = MutableStateFlow(LocalDate.now())
    val currentDate: StateFlow<LocalDate> = _currentDate.asStateFlow()

    private val _speedMultiplier = MutableStateFlow(1)
    val speedMultiplier: StateFlow<Int> = _speedMultiplier.asStateFlow()

    private val _isAutoMode = MutableStateFlow(false)
    val isAutoMode: StateFlow<Boolean> = _isAutoMode.asStateFlow()

    private val _eventLogs = MutableStateFlow<List<String>>(emptyList())
    val eventLogs: StateFlow<List<String>> = _eventLogs.asStateFlow()

    private var simulationJob: Job? = null
    private var onAlarmCheck: ((LocalTime) -> Unit)? = null

    fun setManualTime(hour: Int, minute: Int) {
        val newTime = LocalTime.of(hour, minute)
        _currentTime.value = newTime
        addLog("ตั้งเวลาด้วยตนเอง: $newTime")
        checkAlarms()
    }

    fun quickJumpTo(time: LocalTime) {
        _currentTime.value = time
        addLog("กระโดดเวลาไปยัง: $time")
        checkAlarms()
    }

    fun setSpeed(multiplier: Int) {
        _speedMultiplier.value = multiplier
        addLog("ตั้งความเร็ว: ${multiplier}x")
        if (_isAutoMode.value) {
            restartAutoMode()
        }
    }

    fun toggleAutoMode() {
        _isAutoMode.value = !_isAutoMode.value
        if (_isAutoMode.value) {
            startAutoMode()
            addLog("เปิดโหมด AUTO")
        } else {
            stopAutoMode()
            addLog("ปิดโหมด AUTO")
        }
    }

    fun quickJumpToMorning() = quickJumpTo(LocalTime.of(6, 0))
    fun quickJumpToNoon() = quickJumpTo(LocalTime.of(12, 0))
    fun quickJumpToEvening() = quickJumpTo(LocalTime.of(18, 0))
    fun quickJumpToMidnight() = quickJumpTo(LocalTime.of(23, 59))
    fun quickJumpToStartOfDay() = quickJumpTo(LocalTime.of(0, 0))
    fun quickJumpToNow() {
        val now = LocalTime.now()
        _currentTime.value = now
        _currentDate.value = LocalDate.now()
        addLog("กระโดดไปยังเวลาปัจจุบัน: $now")
        checkAlarms()
    }

    fun setOnAlarmCheckListener(listener: (LocalTime) -> Unit) {
        onAlarmCheck = listener
    }

    private fun startAutoMode() {
        stopAutoMode()
        simulationJob = CoroutineScope(Dispatchers.Main).launch {
            while (_isAutoMode.value) {
                delay(1000 / _speedMultiplier.value) // ปรับความเร็ว
                _currentTime.value = _currentTime.value.plusSeconds(1)
                checkAlarms()

                // ตรวจสอบว่าข้ามวันหรือไม่
                if (_currentTime.value == LocalTime.MIDNIGHT) {
                    _currentDate.value = _currentDate.value.plusDays(1)
                }
            }
        }
    }

    private fun stopAutoMode() {
        simulationJob?.cancel()
        simulationJob = null
    }

    private fun restartAutoMode() {
        if (_isAutoMode.value) {
            stopAutoMode()
            startAutoMode()
        }
    }

    private fun checkAlarms() {
        onAlarmCheck?.invoke(_currentTime.value)
    }

    private fun addLog(message: String) {
        val timestamp = LocalDateTime.now()
        val logEntry = "[$timestamp] $message"
        _eventLogs.value = _eventLogs.value.takeLast(9) + logEntry // เก็บล่าสุด 10 รายการ
    }

    fun clearLogs() {
        _eventLogs.value = emptyList()
    }

    // สำหรับการทดสอบจาก Issue #7
    fun getCurrentDateTime(): LocalDateTime {
        return LocalDateTime.of(_currentDate.value, _currentTime.value)
    }

    companion object {
        // ความเร็วที่รองรับตาม Issue #7
        val SUPPORTED_SPEEDS = listOf(1, 10, 60, 100)

        // เวลากระโดดด่วนตาม Issue #7
        val QUICK_JUMP_TIMES = mapOf(
            "เช้า" to LocalTime.of(6, 0),
            "กลางวัน" to LocalTime.of(12, 0),
            "เย็น" to LocalTime.of(18, 0),
            "เที่ยงคืน" to LocalTime.of(23, 59),
            "เริ่มวัน" to LocalTime.of(0, 0)
        )
    }
}