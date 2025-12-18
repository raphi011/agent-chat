# Agent Chat iOS App

Cross-platform mobile application for communicating with AI agents running in n8n workflows.

## Technology Stack

- **Kotlin Multiplatform Mobile (KMM)**: Share business logic across platforms
- **Compose Multiplatform**: Shared UI code with native performance
- **Ktor**: HTTP client for API communication
- **kotlinx.serialization**: JSON serialization
- **kotlinx.coroutines**: Async/concurrent programming

## Project Structure

```
ios/
├── build.gradle.kts              # Kotlin Multiplatform build config
├── settings.gradle.kts           # Project settings
├── gradle.properties             # Build properties
├── src/
│   ├── commonMain/               # Shared code (iOS + future Android)
│   │   └── kotlin/com/agentchat/
│   │       ├── App.kt            # Main Compose UI
│   │       ├── ui/               # UI components
│   │       └── data/             # Data layer (API, models)
│   └── iosMain/                  # iOS-specific code
│       └── kotlin/com/agentchat/
│           └── MainViewController.kt  # iOS entry point
└── iosApp/                       # Xcode project
    └── iosApp/
        ├── iOSApp.swift          # SwiftUI wrapper
        └── Info.plist            # iOS app configuration
```

## Setup

### Prerequisites

- macOS with Xcode installed
- JDK 25
- Kotlin 2.1.0+ (via Gradle)
- CocoaPods (for iOS dependencies)

### Build Commands

```bash
# Build the Kotlin framework for iOS
./gradlew linkDebugFrameworkIosSimulatorArm64

# Build for device
./gradlew linkDebugFrameworkIosArm64

# Clean build
./gradlew clean
```

### Running the App

#### Option 1: Command Line (No Xcode IDE)

```bash
# Build and run in simulator
make run

# Or step by step:
./gradlew linkDebugFrameworkIosSimulatorArm64
./run-simulator.sh

# List available simulators
make list-simulators
# or
./list-simulators.sh
```

#### Option 2: Xcode IDE

1. Open `iosApp/iosApp.xcodeproj` in Xcode
2. Select a simulator or device
3. Build and run (Cmd+R)

## Development

### Common Code (Shared)

All UI and business logic in `src/commonMain/` is shared across platforms:
- Compose UI components
- API client
- Data models
- View models
- Business logic

### iOS-Specific Code

Platform-specific implementations in `src/iosMain/`:
- Native iOS API access (Camera, Push Notifications, etc.)
- iOS-specific features

## Features

### Current
- Basic chat interface with Material Design 3
- Message input and display
- Compose Multiplatform UI

### Planned
- Real-time SSE connection to n8n backend
- End-to-end encryption
- Multi-threaded conversations
- Markdown rendering
- Push notifications
- Message history persistence
- File attachments
- Device synchronization (iPad ↔ iPhone)

## Architecture

### Layers

1. **UI Layer** (`ui/`)
   - Compose components
   - Screen composables
   - Navigation

2. **Domain Layer** (TBD)
   - Use cases
   - Business logic
   - Repository interfaces

3. **Data Layer** (`data/`)
   - API client (Ktor)
   - Data models
   - Repository implementations
   - Local storage (if needed)

### Communication Flow

```
Mobile App → Backend Service ← n8n Workflow
    ↓             ↓                ↓
  UI Layer   SSE/WebSocket    Agent Chat Node
    ↓             ↓                ↓
Data Layer    Authentication   Message Router
```

## Dependencies

Key dependencies (see `build.gradle.kts` for versions):
- `org.jetbrains.compose` - Compose Multiplatform
- `io.ktor:ktor-client-*` - HTTP client
- `kotlinx-coroutines-core` - Coroutines
- `kotlinx-serialization-json` - JSON handling
- `kotlinx-datetime` - Date/time utilities

## Troubleshooting

### Framework not found
Run `./gradlew linkDebugFrameworkIosSimulatorArm64` to build the Kotlin framework.

### Build errors in Xcode
Clean build folder: Product → Clean Build Folder (Shift+Cmd+K)

### Simulator not working
Ensure you're building for the correct architecture:
- Apple Silicon Mac → `iosSimulatorArm64`
- Intel Mac → `iosX64`
