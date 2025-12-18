#!/bin/bash

# List available iOS simulators

echo "Available iOS Simulators:"
echo "========================"
xcrun simctl list devices available | grep -E "iPhone|iPad"
