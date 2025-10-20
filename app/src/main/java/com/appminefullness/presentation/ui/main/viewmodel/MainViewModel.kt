package com.appminefullness.presentation.ui.main.viewmodel

import android.app.Application
import androidx.lifecycle.*
import com.appminefullness.AppMinefullnessApplication
import com.appminefullness.data.models.AlarmEntity
import kotlinx.coroutines.launch

class MainViewModel(application: Application) : AndroidViewModel(application) {

    private val database = (application as AppMinefullnessApplication).database

    private val _alarms = MutableLiveData<List<AlarmEntity>>()
    val alarms: LiveData<List<AlarmEntity>> = _alarms

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _errorMessage = MutableLiveData<String>()
    val errorMessage: LiveData<String> = _errorMessage

    fun loadAlarms() {
        viewModelScope.launch {
            _isLoading.value = true
            try {
                database.alarmDao().getAllAlarms().collect { alarmList ->
                    _alarms.value = alarmList
                    _isLoading.value = false
                }
            } catch (e: Exception) {
                _errorMessage.value = "ไม่สามารถโหลดการแจ้งเตือนได้: ${e.message}"
                _isLoading.value = false
            }
        }
    }

    fun toggleAlarm(alarmId: Long, enabled: Boolean) {
        viewModelScope.launch {
            try {
                database.alarmDao().toggleAlarm(alarmId, enabled)
            } catch (e: Exception) {
                _errorMessage.value = "ไม่สามารถเปลี่ยนสถานะการแจ้งเตือนได้: ${e.message}"
            }
        }
    }

    fun deleteAlarm(alarm: AlarmEntity) {
        viewModelScope.launch {
            try {
                database.alarmDao().deleteAlarm(alarm)
                _errorMessage.value = "ลบการแจ้งเตือนสำเร็จ"
            } catch (e: Exception) {
                _errorMessage.value = "ไม่สามารถลบการแจ้งเตือนได้: ${e.message}"
            }
        }
    }

    fun clearError() {
        _errorMessage.value = ""
    }
}