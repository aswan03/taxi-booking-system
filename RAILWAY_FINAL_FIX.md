# Final Fix for Railway "mvn not found" Error

## Problem
Railway is trying to run `mvn spring-boot:run` but Maven is not available in the runtime container (only in the build stage).

## Root Cause
The `Procfile` was overriding the Dockerfile's ENTRYPOINT. Railway detected it and tried to use `mvn` instead of the JAR file.

## Solution Applied
✅ **Removed `Procfile`** - Now Railway will use the Dockerfile's ENTRYPOINT

## What Railway Should Do Now

1. **Build Stage**: Uses Maven to compile the JAR file
2. **Runtime Stage**: Uses `java -jar app.jar` (from Dockerfile ENTRYPOINT)

## If It Still Doesn't Work

### Check Railway Dashboard Settings

1. Go to your Railway project dashboard
2. Click on your service
3. Go to **Settings** → **Deploy**
4. Make sure these are set correctly:

   **Build Command**: Leave EMPTY (Railway uses Dockerfile)
   
   **Start Command**: Leave EMPTY (Railway uses Dockerfile ENTRYPOINT)
   
   **Dockerfile Path**: `Dockerfile` (or leave default)

5. **Remove any start command** if it says `mvn spring-boot:run` or similar
6. **Save** and trigger a new deployment

### Verify Dockerfile is Being Used

In Railway dashboard:
- Go to **Deployments** tab
- Check the latest deployment logs
- You should see Docker build steps, not Maven commands

### Manual Override (If Needed)

If Railway still tries to use Maven, you can manually set the start command in Railway dashboard:

1. Go to **Settings** → **Deploy**
2. Set **Start Command** to: `java -jar app.jar`
3. Save and redeploy

But this shouldn't be necessary - the Dockerfile ENTRYPOINT should handle it.

## Current Configuration

- ✅ `railway.json` - Specifies Dockerfile builder
- ✅ `Dockerfile` - Has correct ENTRYPOINT: `java -jar app.jar`
- ✅ No `Procfile` - Won't override Dockerfile
- ✅ No start command override in railway.json

## Expected Behavior

When Railway deploys:
1. Builds Docker image using Dockerfile
2. Build stage compiles JAR with Maven
3. Runtime stage copies JAR
4. Container starts with `java -jar app.jar`
5. Spring Boot reads `PORT` environment variable automatically

## Test Deployment

After Railway redeploys, check:
- Container logs should show Spring Boot starting
- No "mvn not found" errors
- Application should be accessible on Railway's provided URL
