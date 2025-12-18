#!/bin/bash

# Agent Chat iOS - Run in Simulator without Xcode IDE

set -e

echo "🔨 Building Kotlin framework..."
./gradlew linkDebugFrameworkIosSimulatorArm64

echo "📦 Building iOS app..."
xcodebuild -project iosApp/iosApp.xcodeproj \
    -scheme iosApp \
    -configuration Debug \
    -sdk iphonesimulator \
    -destination 'platform=iOS Simulator,name=iPhone 15,OS=latest' \
    build

echo "🚀 Installing and launching app..."
xcrun simctl boot "iPhone 15" 2>/dev/null || true
xcrun simctl install "iPhone 15" "$(find ~/Library/Developer/Xcode/DerivedData -name "iosApp.app" | head -n 1)"
xcrun simctl launch "iPhone 15" com.agentchat.iosApp

echo "✅ App launched on iPhone 15 simulator"
