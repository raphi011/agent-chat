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
		-destination 'platform=iOS Simulator,name=iPhone 17,OS=latest' \
		build

run: build
	@echo "🚀 Installing and launching app..."
	@xcrun simctl boot "iPhone 17" 2>/dev/null || true
	@APP_PATH=$$(xcodebuild -project iosApp/iosApp.xcodeproj -scheme iosApp -configuration Debug -showBuildSettings 2>/dev/null | grep -m 1 "BUILT_PRODUCTS_DIR" | awk '{print $$3}')/iosApp.app; \
	xcrun simctl install "iPhone 17" "$$APP_PATH"; \
	xcrun simctl launch "iPhone 17" com.agentchat.iosApp
	@echo "✅ App launched on iPhone 17 simulator"

clean:
	@echo "🧹 Cleaning build artifacts..."
	./gradlew clean
	xcodebuild -project iosApp/iosApp.xcodeproj clean
	@echo "✅ Clean complete"

list-simulators:
	@./list-simulators.sh
