#!/bin/bash

# Expo Android APK Build Retry Script

MAX_RETRIES=5
RETRY_DELAY=60  # seconds

for ((i=1; i<=$MAX_RETRIES; i++)); do
    echo "=== Build Attempt $i/$MAX_RETRIES ==="
    echo "$(date)"
    
    # Run the build command
    npx eas-cli build -p android --profile preview --no-wait
    
    # Check exit code
    if [ $? -eq 0 ]; then
        echo "=== Build started successfully! ==="
        echo "Check build status with: npx eas-cli build:list --platform android"
        exit 0
    fi
    
    echo "=== Build attempt $i failed. Retrying in $RETRY_DELAY seconds... ==="
    sleep $RETRY_DELAY
done

echo "=== All $MAX_RETRIES build attempts failed. Please check network connection and try again later. ==="
exit 1