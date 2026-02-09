# Fix for JAR File Error on Railway/Render

## Problem
Error: `Unable to access jarfile target/taxi-booking-system-0.0.1-SNAPSHOT.jar`

## Solution

I've updated the configuration files to use `mvn spring-boot:run` instead of directly running the JAR file. This is more reliable on Railway and Render.

## Updated Files

1. **railway.json** - Now uses `mvn spring-boot:run`
2. **render.yaml** - Now uses `mvn spring-boot:run`
3. **Procfile** - Added for Heroku compatibility
4. **start.sh** - Alternative script that finds JAR dynamically

## For Railway

The `railway.json` file has been updated. Railway should automatically detect and use it. If you're still having issues:

1. Go to your Railway project
2. Click on your service
3. Go to "Settings" → "Deploy"
4. Make sure "Build Command" is empty (Railway will use railway.json)
5. Set "Start Command" to: `mvn spring-boot:run -Dspring-boot.run.arguments='--server.port=$PORT'`

## For Render

The `render.yaml` file has been updated. If you're still having issues:

1. Go to your Render dashboard
2. Select your service
3. Go to "Settings"
4. Update "Start Command" to: `mvn spring-boot:run -Dspring-boot.run.arguments='--server.port=$PORT'`

## Alternative: Use JAR File (if build succeeds)

If you prefer to use the JAR file approach, you can use the `start.sh` script:

1. Make sure `start.sh` is executable
2. Set start command to: `bash start.sh`

Or manually set:
```bash
JAR_FILE=$(find target -name "*.jar" -type f | head -n 1) && java -jar "$JAR_FILE"
```

## Why This Happens

The JAR file might not be created if:
- Maven build fails silently
- Working directory is different
- Build artifacts are cleaned before start

Using `mvn spring-boot:run` avoids this by running directly from Maven without needing the JAR file.
