---
title: "Mobile Task Manager"
description: "Cross-platform task management app built with Flutter and Kotlin, featuring real-time sync and offline support."
tech: ["Flutter", "Kotlin", "Android", "Firebase"]
github: "https://github.com/ZeroWillHero/mobile-task-manager"
live: ""
cover: ""
images: []
date: "2026-04-10"
featured: true
status: "completed"
---

# Mobile Task Manager

A cross-platform task management application targeting Android devices, built with Flutter for the UI layer and Kotlin for native Android modules.

## Features

- Create, edit, and delete tasks with categories and priorities
- Offline-first architecture — works without internet, syncs when connected
- Real-time collaboration — share task lists with other users
- Push notifications for due date reminders
- Dark/light theme support
- Material You design language

## Architecture

The app uses a clean architecture pattern with three layers:

- **Presentation** — Flutter widgets + BLoC state management
- **Domain** — use cases and repository interfaces
- **Data** — Firebase Firestore + local SQLite cache

```kotlin
// Native Android notification module
class NotificationModule : FlutterPlugin {
    override fun onAttachedToEngine(binding: FlutterPlugin.FlutterPluginBinding) {
        val channel = MethodChannel(binding.binaryMessenger, "notifications")
        channel.setMethodCallHandler { call, result ->
            when (call.method) {
                "scheduleReminder" -> scheduleNotification(call.arguments)
                else -> result.notImplemented()
            }
        }
    }
}
```

## Key Challenges

The main technical challenge was building a reliable offline-first sync engine. The solution uses a conflict-resolution strategy based on vector clocks to handle concurrent edits from multiple devices.
