# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a mobile messaging application (iOS-first, Android later) that enables real-time communication with AI agents running in n8n workflows. The app uses Kotlin Native for cross-platform UI development and implements end-to-end encryption for secure messaging.

**Key Technical Characteristics:**
- Cross-platform mobile app using Kotlin Native
- Real-time WebSocket-based communication (no polling)
- End-to-End encryption for all messages
- Integration with n8n AI Agent workflows
- Rich markdown message formatting
- Multi-threaded chat support
- Push notification capabilities (one-way, similar to Pushover)

**Project Maturity:** Early stage - build system and source structure not yet established.

## Development Setup

**Required Tools:**
- JDK 25 (latest version with Kotlin 2.1.0+ support)
- Kotlin 2.1.0 or later (latest version supporting JVM 25)
- Kotlin Multiplatform Mobile (KMM) toolchain
- Gradle (build system for iOS/mobile apps)
- Node.js 18+ and npm 9+ (for n8n node development)
- IntelliJ IDEA (primary IDE)

**Note:** Project will use the newest Kotlin and JVM versions available.

## Repository Structure

This is a monorepo containing multiple related projects:

```
agent-chat/
├── packages/
│   └── n8n-agent-chat/        # Custom n8n nodes (TypeScript)
│       ├── nodes/              # Node implementations
│       │   ├── AgentChatTrigger/
│       │   └── SendToAgentChat/
│       ├── credentials/        # API credential definitions
│       └── package.json
├── apps/
│   └── ios/                    # iOS app (Kotlin Multiplatform + Compose)
│       ├── build.gradle.kts    # Kotlin Multiplatform config
│       ├── src/
│       │   ├── commonMain/     # Shared code (UI + business logic)
│       │   └── iosMain/        # iOS-specific implementations
│       └── iosApp/             # Xcode project with SwiftUI wrapper
└── package.json                # Root workspace configuration
```

## Common Commands

**Monorepo Management:**
```bash
# Install all dependencies
npm install

# Build all packages
npm run build

# Build specific package
npm run build:n8n
```

**n8n Node Development:**
```bash
# Navigate to n8n package
cd packages/n8n-agent-chat

# Install dependencies
npm install

# Development mode (watch)
npm run dev

# Build
npm run build

# Lint and format
npm run lint
npm run format
```

**iOS App Development:**
```bash
# Navigate to iOS app
cd apps/ios

# Quick commands using Makefile
make run              # Build and run in simulator (no Xcode IDE needed)
make build            # Build only
make clean            # Clean build artifacts
make list-simulators  # Show available simulators

# Manual build commands
./gradlew linkDebugFrameworkIosSimulatorArm64  # Build Kotlin framework
./run-simulator.sh    # Build and run in simulator

# Build for physical device
./gradlew linkDebugFrameworkIosArm64

# Or use Xcode IDE
open iosApp/iosApp.xcodeproj  # Then press Cmd+R
```

## Project Architecture

### Planned Core Components

1. **Real-time Communication Layer**
   - Real-time bidirectional communication
   - No polling architecture
   - Connection management and automatic reconnection

2. **Encryption Module**
   - End-to-end encryption implementation
   - Key management for secure communication

3. **n8n Integration** (Custom Agent Chat node - primary implementation approach)
   - **Custom "Agent Chat" n8n nodes**: Two-node system (Trigger + Send)
   - **Agent Chat Trigger Node**: Receives messages from mobile app with chat context
   - **Send to Agent Chat Node**: Sends responses/notifications back to app
   - **Built-in Features**: Authentication, threading, message history, delivery tracking
   - **Alternative**: Could fall back to Webhook + SSE Trigger if custom node development is delayed

4. **Chat Management**
   - Multi-threaded conversation support
   - Message persistence and retrieval

5. **Notification System**
   - One-way push notifications
   - Similar to Pushover service pattern

6. **UI Layer**
   - Compose Multiplatform for cross-platform UI development
   - Shared UI code across iOS (and potentially Android later)
   - Native API access when needed (Camera, push notifications, etc.)
   - Markdown rendering for rich text messages

7. **Synchronization (Future)**
   - Cross-device sync (iPad ↔ iPhone)

### Key Design Decisions

- **Compose Multiplatform over Flutter/React Native:** Production-ready cross-platform UI framework that shares code across platforms while maintaining native API access
- **Custom n8n Node from Start:** Building dedicated Agent Chat nodes for better integration, simplified setup, and chat-aware features rather than using generic Webhook/SSE nodes
- **iOS-first approach:** Android support planned but not initial priority
- **n8n as backend:** Leverages existing workflow automation infrastructure with AI Agent node integration

## Custom n8n Node Design (Primary Implementation)

### Implementation Approach

Building custom "Agent Chat" nodes from the start for optimal integration:

**1. Agent Chat Trigger Node**
- Listens for incoming messages from the mobile app
- Automatically handles authentication and routing
- Provides chat context (thread ID, user info, message history)
- Output: Message content, metadata, conversation context

**2. Send to Agent Chat Node**
- Sends responses back to the mobile app
- Handles delivery confirmation
- Supports rich content (markdown, images, attachments)
- Manages conversation state and threading

**3. Key Improvements Over Webhook + SSE**
- **Simplified Setup**: No manual webhook URL configuration
- **Built-in Authentication**: Credential management built into the node
- **Chat-Aware**: Understands concepts like threads, users, and conversation history
- **Delivery Status**: Track message delivery and read receipts
- **Type Safety**: Structured input/output instead of raw HTTP
- **Better UX**: Drag-and-drop "Agent Chat" nodes instead of generic HTTP nodes
- **Connection Management**: Handles SSE connections and reconnection logic automatically

**4. Potential Features**
- Support for typing indicators
- Message reactions and interactions
- File attachments handling
- Push notification triggers
- Conversation history retrieval
- Multi-device synchronization support

**5. Technical Implementation**
- Node type: Both Trigger (receiving) and Action (sending)
- Built using n8n's declarative node style
- Credential system for app API keys
- WebSocket or SSE support for real-time delivery
- TypeScript implementation
- Will be developed in parallel with the mobile app

### Fallback Option

If custom node development needs to be deferred:
- **Sending messages**: App → n8n Webhook node
- **Receiving messages**: n8n SSE Trigger → App
- This allows mobile app development to proceed independently
- Custom nodes can be added later without changing app architecture

## Important Notes

- **Monorepo Structure**: Uses npm workspaces to manage multiple packages
- **n8n Node Package**: Basic scaffolding complete with two node types (Trigger + Send)
  - Located in `packages/n8n-agent-chat/`
  - TypeScript-based with placeholder implementations
  - Ready for actual SSE/webhook implementation
- **iOS App**: Scaffolded with Kotlin Multiplatform + Compose Multiplatform
  - Located in `apps/ios/`
  - Gradle build configured with Kotlin 2.1.0 and Compose 1.7.1
  - Basic chat UI implemented in `App.kt`
  - SwiftUI wrapper for iOS integration in `iosApp/`
  - Includes Ktor for networking, coroutines, and serialization
  - Ready for SSE/WebSocket implementation