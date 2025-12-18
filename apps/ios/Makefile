.PHONY: help build run clean list-simulators

help:
	@echo "Agent Chat iOS - Available Commands"
	@echo "===================================="
	@echo "make build           - Build Kotlin framework and iOS app"
	@echo "make run             - Build and run in simulator"
	@echo "make clean           - Clean all build artifacts"
	@echo "make list-simulators - List available iOS simulators"
	@echo "make gradle-build    - Build just the Kotlin framework"

gradle-build:
	@echo "🔨 Building Kotlin framework..."
	./gradlew linkDebugFrameworkIosSimulatorArm64

build: gradle-build
	@echo "📦 Building iOS app..."
	xcodebuild -project iosApp/iosApp.xcodeproj \
		-scheme iosApp \
		-configuration Debug \
		-sdk iphonesimulator \
		-destination 'platform=iOS Simulator,name=iPhone 15,OS=latest' \
		build

run: build
	@echo "🚀 Installing and launching app..."
	@xcrun simctl boot "iPhone 15" 2>/dev/null || true
	@DERIVED_DATA=$$(xcodebuild -project iosApp/iosApp.xcodeproj -showBuildSettings | grep -m 1 "BUILD_DIR" | grep -oEi "\/.*" | xargs dirname); \
	APP_PATH="$$DERIVED_DATA/Debug-iphonesimulator/iosApp.app"; \
	xcrun simctl install "iPhone 15" "$$APP_PATH"; \
	xcrun simctl launch "iPhone 15" com.agentchat.iosApp
	@echo "✅ App launched on iPhone 15 simulator"

clean:
	@echo "🧹 Cleaning build artifacts..."
	./gradlew clean
	xcodebuild -project iosApp/iosApp.xcodeproj clean
	@echo "✅ Clean complete"

list-simulators:
	@./list-simulators.sh
