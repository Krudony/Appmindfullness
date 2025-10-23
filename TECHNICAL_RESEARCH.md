# AppMinefullness - React Native Technical Research
**Date**: 2025-10-23
**Project**: AppMinefullness (แอปแจ้งเตือนระฆัง)
**Focus**: Background Tasks, Foreground Services, Audio Management
**Status**: Complete Technical Analysis

---

## Executive Summary

This document provides a comprehensive technical analysis of React Native libraries and approaches for implementing a bell notification app that:
- Runs reliably in the background
- Plays audio at scheduled times
- Maintains battery efficiency
- Works even when the screen is off

### Key Findings
- **Recommended Stack**: React Native Background Actions + Notifee + React Native Audio API
- **Complexity**: Moderate (requires native code for Android/iOS)
- **Battery Impact**: Can be optimized with Foreground Service pattern
- **iOS Limitations**: Limited background time (~3-5 minutes unless using specific modes)
- **Android Advantages**: More flexible background execution options

---

## 1. Background Task Libraries Research

### 1.1 React Native Background Actions
**Library ID**: `/huddle01/react-native-background-actions`
**Trust Score**: 8.8/10 | **Code Snippets**: 12

#### Overview
Runs background tasks indefinitely on Android and iOS with foreground service support.

#### Key Features
✅ True background execution (not limited to periodic checks)
✅ Foreground Service notification (required for Android 8+)
✅ Works when app is killed or screen is off
✅ Cross-platform (iOS and Android)
✅ Supports task parameters

#### How It Works
- **Android**: Uses Foreground Service (visible notification always displayed)
- **iOS**: Uses background modes, limited to ~3-5 minutes per background session

#### Installation
```bash
npm install @huddle01/react-native-background-actions
# or
yarn add @huddle01/react-native-background-actions
```

#### Configuration

**Android Manifest** (AndroidManifest.xml):
```xml
<manifest ... >
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />

    <application ... >
        <service
            android:name="com.asterinet.react.bgactions.RNBackgroundActionsTask"
            android:foregroundServiceType="shortService"/>
    </application>
</manifest>
```

**iOS** (Info.plist):
```xml
<key>BGTaskSchedulerPermittedIdentifiers</key>
<array>
    <string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
</array>
```

#### Basic Implementation
```javascript
import BackgroundService from '@huddle01/react-native-background-actions';

const alarmTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;
    await new Promise(async (resolve) => {
        while (BackgroundService.isRunning()) {
            // Check if alarm time has been reached
            const now = new Date();
            // Play bell sound if needed
            await sleep(delay);
        }
    });
};

const options = {
    taskName: 'BellAlarm',
    taskTitle: 'ระฆังวัด',
    taskDesc: 'ตรวจสอบเวลาแจ้งเตือน',
    taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
    },
    color: '#FF9800',
    linkingURI: 'appminefullness://alarm',
    parameters: {
        delay: 60000, // Check every minute
    },
};

// Start background service
await BackgroundService.start(alarmTask, options);
```

#### Pros
- Simplest approach for alarm app use case
- Reliable background execution
- Good documentation with examples
- Active maintenance

#### Cons
- Always shows notification (required on Android)
- iOS background time is still limited
- Needs native module installation

#### Best For
**✅ AppMinefullness Use Case**: This is ideal for your app - it provides true background execution needed for alarm timing.

---

### 1.2 React Native Background Fetch
**Library ID**: `/transistorsoft/react-native-background-fetch`
**Trust Score**: 8.3/10 | **Code Snippets**: 70

#### Overview
Periodic background callback handler for iOS and Android (15+ minutes interval).

#### How It Works
- **Android**: JobScheduler or AlarmManager
- **iOS**: BGTaskScheduler (iOS 13+) or background fetch API

#### Installation
```bash
npm install react-native-background-fetch
```

#### Basic Implementation
```javascript
import BackgroundFetch from "react-native-background-fetch";

let MyHeadlessTask = async (event) => {
  let taskId = event.taskId;
  let isTimeout = event.timeout;

  if (isTimeout) {
    BackgroundFetch.finish(taskId);
    return;
  }

  // Check alarm times and play sound if needed
  console.log('[BackgroundFetch] Task:', taskId);

  // DO WORK HERE
  BackgroundFetch.finish(taskId);
}

BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

// In your component
let status = await BackgroundFetch.configure({
  minimumFetchInterval: 15 // minutes
}, async (taskId) => {
  console.log("[BackgroundFetch] taskId", taskId);
  BackgroundFetch.finish(taskId);
}, async (taskId) => {
  console.log("[BackgroundFetch] TIMEOUT", taskId);
  BackgroundFetch.finish(taskId);
});
```

#### Pros
- Well-documented (70 code snippets)
- Reliable periodic execution
- Active community

#### Cons
- **Not suitable for alarms**: 15+ minute minimum interval
- Cannot guarantee exact alarm timing
- Requires headless task registration
- Limited background time

#### Best For
❌ **Not ideal for AppMinefullness**: The 15-minute minimum interval means alarm times won't fire precisely.

---

## 2. Foreground Service Implementation

### 2.1 Notifee Library
**Library ID**: `/invertase/notifee`
**Trust Score**: 10/10 | **Code Snippets**: 388

#### Overview
Feature-rich library for creating rich, styled, and interactive Android/iOS notifications. Essential for Foreground Service implementation.

#### Key Features
✅ Foreground Service management
✅ Rich notifications with actions
✅ Progress indicators
✅ Sound and vibration control
✅ Notification channels and groups
✅ Android 14+ support

#### Installation
```bash
npm install @notifee/react-native
```

#### Android Configuration

**AndroidManifest.xml**:
```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />

    <application>
        <!-- For Android 14+ -->
        <service
            android:name="app.notifee.core.ForegroundService"
            android:foregroundServiceType="mediaPlayback"
            tools:replace="android:foregroundServiceType" />
    </application>
</manifest>
```

#### Foreground Service Implementation
```javascript
import notifee, { AndroidForegroundServiceType } from '@notifee/react-native';

// Create notification channel first
async function createChannel() {
  await notifee.createChannel({
    id: 'alarm',
    name: 'Alarm Notifications',
    importance: AndroidImportance.HIGH,
    sound: 'default',
    vibration: true,
  });
}

// Register foreground service
async function startAlarmService() {
  await createChannel();

  notifee.registerForegroundService((notification) => {
    return new Promise(async () => {
      // Long-running task
      let isRunning = true;

      notifee.onForegroundEvent(async ({ type, detail }) => {
        if (type === EventType.ACTION_PRESS) {
          if (detail.pressAction.id === 'stop') {
            isRunning = false;
            await notifee.stopForegroundService();
          }
        }
      });

      // Keep checking for alarms
      while (isRunning) {
        const now = new Date();
        // Check if any alarm should trigger
        if (shouldPlayBell(now)) {
          await playBellSound();
          await notifee.displayNotification({
            id: notification.id,
            title: 'ระฆังวัด',
            body: 'เวลา: ' + formatTime(now),
            android: {
              channelId: 'alarm',
              asForegroundService: true,
              foregroundServiceTypes: [
                AndroidForegroundServiceType.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
              ],
              actions: [
                {
                  title: 'หยุด',
                  pressAction: { id: 'stop' },
                }
              ],
            },
          });
        }

        // Check every minute
        await sleep(60000);
      }
    });
  });

  // Display initial notification
  await notifee.displayNotification({
    title: 'ระฆังวัด',
    body: 'กำลังทำงาน',
    android: {
      channelId: 'alarm',
      asForegroundService: true,
      foregroundServiceTypes: [
        AndroidForegroundServiceType.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK
      ],
      actions: [
        {
          title: 'หยุด',
          pressAction: { id: 'stop' },
        }
      ],
    },
  });
}
```

#### Pros
- Highest trust score (10/10)
- Most comprehensive documentation
- Android 14+ compliant
- Excellent API design
- Active development

#### Cons
- Android-focused (Foreground Service is Android concept)
- Requires notification always visible
- Complex configuration

#### Best For
**✅ Essential Component**: Use this for displaying the persistent notification required by Android Foreground Service.

---

## 3. Audio Management Libraries

### 3.1 React Native Audio API
**Library ID**: `/software-mansion/react-native-audio-api`
**Trust Score**: 8.7/10 | **Code Snippets**: 142

#### Overview
High-performance audio engine for React Native with Web Audio API compatibility.

#### Key Features
✅ Web Audio API compatible
✅ Multiple audio nodes (BufferSource, Oscillator, etc.)
✅ Audio analysis capabilities
✅ Background audio support
✅ Real-time audio processing

#### Installation
```bash
npm install react-native-audio-api
# Or with Expo
expo install react-native-audio-api
```

#### Basic Implementation (Bell Sound)
```javascript
import { AudioContext } from 'react-native-audio-api';

class BellAudioManager {
  constructor() {
    this.audioContext = new AudioContext();
    this.audioBuffer = null;
  }

  // Load bell sound from app bundle or URL
  async loadBellSound() {
    const audioBuffer = await fetch('file:///android_asset/bell.mp3')
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) =>
        this.audioContext.decodeAudioData(arrayBuffer)
      );
    this.audioBuffer = audioBuffer;
  }

  // Play the bell sound
  async playBell() {
    if (!this.audioBuffer) {
      await this.loadBellSound();
    }

    const source = this.audioContext.createBufferSource();
    source.buffer = this.audioBuffer;
    source.connect(this.audioContext.destination);
    source.start(this.audioContext.currentTime);
  }

  // Generate simple bell tone (fallback if file not available)
  async playBellTone() {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    // Bell frequency (around 1000 Hz)
    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Fade out
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 2
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 2);
  }
}
```

#### Pros
- Modern Web Audio API
- Good documentation
- Background audio support
- Multiple audio source options

#### Cons
- Requires additional configuration for foreground service
- File path handling can be tricky
- Need to bundle audio files

#### Best For
**✅ Audio Playback**: This is the best choice for modern, flexible audio handling.

---

### 3.2 React Native Sound (Alternative)
**Library ID**: `/zmxv/react-native-sound`
**Trust Score**: 8.4/10 | **Code Snippets**: 4

#### Overview
Simpler library specifically for playing sound clips.

#### Installation
```bash
npm install react-native-sound
```

#### Basic Implementation
```javascript
import Sound from 'react-native-sound';

const bellSound = new Sound('bell.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Failed to load sound', error);
  }
});

const playBell = () => {
  bellSound.play((success) => {
    if (success) {
      console.log('Sound played successfully');
    }
  });
};
```

#### Pros
- Simpler API
- Lightweight
- Good for simple use cases

#### Cons
- Less flexibility
- Fewer features
- Less active development
- No real-time processing

#### Best For
❌ **Not recommended**: React Native Audio API is more modern and flexible.

---

## 4. Recommended Architecture

### 4.1 Component Stack

```
┌─────────────────────────────────────────────────────┐
│         React Native App (UI Layer)                 │
│  ┌─────────────────────────────────────────────┐   │
│  │ • Home Screen (Settings)                    │   │
│  │ • Time Picker                               │   │
│  │ • Bell Selector                             │   │
│  │ • On/Off Toggle                             │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
         ↓                              ↓
┌──────────────────────┐    ┌──────────────────────┐
│  Background Service  │    │  Storage Service     │
│  (Alarm Logic)       │    │  (AsyncStorage)      │
│                      │    │                      │
│ • Time Checking      │    │ • Alarm Times        │
│ • Bell Scheduling    │    │ • Settings           │
│ • Audio Playback     │    │ • User Preferences   │
└──────────────────────┘    └──────────────────────┘
         ↓
┌─────────────────────────────────────────────────────┐
│       Native Modules & System Integration           │
│  ┌──────────────────┐  ┌──────────────────────┐   │
│  │ Background       │  │ Audio Management     │   │
│  │ Actions          │  │ (React Native Audio) │   │
│  │                  │  │                      │   │
│  │ • Foreground     │  │ • Bell Sounds        │   │
│  │   Service        │  │ • Volume Control     │   │
│  │ • Wake Lock      │  │ • Background Play    │   │
│  └──────────────────┘  └──────────────────────┘   │
│  ┌──────────────────────────────────────────────┐  │
│  │        Notifications (Notifee)               │  │
│  │ • Persistent Notification                   │  │
│  │ • User Actions                               │  │
│  │ • Foreground Service Integration             │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### 4.2 Library Integration Matrix

| Component | Library | Why Chosen |
|-----------|---------|-----------|
| **Background Task** | React Native Background Actions | True indefinite background execution |
| **Foreground Service** | Notifee | Best-in-class, Android 14+ support |
| **Audio Playback** | React Native Audio API | Modern, flexible, background support |
| **State Management** | React Context | Simple, suitable for this app |
| **Storage** | AsyncStorage | Reliable, built-in React Native |
| **Notifications** | Notifee | Unified with foreground service |

---

## 5. Implementation Checklist

### Phase 1: Setup
- [ ] Create React Native CLI project
- [ ] Install: `@huddle01/react-native-background-actions`
- [ ] Install: `@notifee/react-native`
- [ ] Install: `react-native-audio-api`
- [ ] Configure Android Manifest permissions
- [ ] Configure iOS Info.plist
- [ ] Link native dependencies

### Phase 2: Core Services
- [ ] Implement AlarmService (time checking logic)
- [ ] Implement AudioManager (bell sound playback)
- [ ] Implement BackgroundServiceManager (background task lifecycle)
- [ ] Create notification configuration

### Phase 3: UI
- [ ] Create HomeScreen component
- [ ] Create TimePicker UI
- [ ] Create Bell Selector UI
- [ ] Create On/Off Toggle
- [ ] Add settings persistence

### Phase 4: Integration
- [ ] Connect UI to background service
- [ ] Test foreground service notification
- [ ] Test bell sound playback
- [ ] Test battery optimization
- [ ] Handle permissions (Android 12+, iOS)

### Phase 5: Testing & Optimization
- [ ] Test with screen off
- [ ] Test after app killed
- [ ] Test audio quality
- [ ] Optimize battery usage
- [ ] Test on multiple devices/Android versions

---

## 6. Battery Optimization Tips

### Android
1. Use Foreground Service (required for long-running tasks)
2. Set appropriate check intervals (60-120 seconds)
3. Implement exponential backoff for error cases
4. Request app whitelist on Doze Mode
5. Use AlarmManager for precise timing (not polling)

### iOS
- Limited to ~3-5 minutes per background session
- Consider using Local Notifications instead of continuous background task
- Use `UIApplication.shared.scheduledLocalNotifications` for exact timing

### Both Platforms
- Minimize wake-lock usage
- Batch checks when possible
- Use efficient timers
- Stop background service when not needed

---

## 7. Permission Requirements

### Android (API Level 31+)
```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
```

### iOS
```xml
<key>NSLocalNetworkUsageDescription</key>
<string>App needs local network access</string>
<key>UIBackgroundModes</key>
<array>
  <string>audio</string>
  <string>processing</string>
</array>
```

---

## 8. Decision: React Native vs Android Native

### ✅ Choose React Native if:
- Want cross-platform compatibility
- Can accept iOS limitations (~5-min background time)
- Need faster development
- Don't need exact second-precision

### ❌ Choose Android Native if:
- Only targeting Android
- Need exact alarm timing (use AlarmManager directly)
- Need unlimited background time guarantee
- Want maximum battery efficiency
- Don't mind longer development time

### Recommendation for AppMinefullness
**✅ Proceed with React Native** because:
1. Cross-platform reach (iOS + Android)
2. Bell notification doesn't require sub-second precision
3. Faster development and maintenance
4. React Native Background Actions handles foreground service well
5. Audio playback is sufficient with React Native Audio API

---

## 9. Known Limitations & Workarounds

### Limitation 1: iOS Background Time Limit
**Problem**: iOS restricts background execution to ~3-5 minutes
**Workaround**:
- Use Local Notifications API for iOS instead of continuous background task
- Schedule notifications for specific times
- Let iOS handle the actual notification delivery

### Limitation 2: Android Doze Mode
**Problem**: System may restrict background tasks on idle devices
**Workaround**:
- Use Foreground Service (always shows notification)
- Request battery optimization whitelist
- Educate users to whitelist app

### Limitation 3: Exact Alarm Timing
**Problem**: React Native Background Actions polls periodically, not exact
**Workaround**:
- Set check interval to 1 minute or less
- Accept ±1 minute tolerance
- For exact timing, would need native AlarmManager

### Limitation 4: Audio Playing While in Silent Mode
**Problem**: iOS respects system mute switch
**Workaround**:
- Use `AVAudioSessionCategoryAlarm` in native code
- This bypasses mute switch for alarm sounds

---

## 10. Cost-Benefit Summary

| Aspect | Pros | Cons |
|--------|------|------|
| **Development** | Fast, code reuse | Learning curve for native |
| **Maintenance** | Single codebase | Platform-specific bugs |
| **Features** | Cross-platform | Some limitations |
| **Battery** | Good with optimization | Foreground service always visible |
| **Reliability** | Good for ±1min precision | Not suitable for exact timing |
| **User Experience** | Simple UI | Persistent notification required |

---

## 11. Next Steps

### Immediate Action Items
1. **Decide**: Confirm React Native is the right choice for your team
2. **Setup**: Create fresh React Native CLI project
3. **Dependencies**: Install and configure required libraries
4. **Architecture**: Implement AlarmService and BackgroundServiceManager
5. **Testing**: Test on real devices with various scenarios

### Questions to Answer
- [ ] Team skill level with React Native?
- [ ] Need for exact alarm timing (precision)?
- [ ] iOS support required?
- [ ] Timeline for MVP?
- [ ] Long-term maintenance capacity?

---

## References

### Libraries Documented
- React Native Background Actions: `/huddle01/react-native-background-actions`
- React Native Background Fetch: `/transistorsoft/react-native-background-fetch`
- Notifee: `/invertase/notifee`
- React Native Audio API: `/software-mansion/react-native-audio-api`
- React Native Sound: `/zmxv/react-native-sound`

### Documentation Sources
- Context7 Library Documentation (via MCP)
- GitHub Repository READMEs
- Official Library Websites

---

**Document Version**: 1.0
**Last Updated**: 2025-10-23
**Prepared By**: Technical Research Assistant
**Status**: Ready for Implementation Planning
