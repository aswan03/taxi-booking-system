# Fix for Railway Repository Snapshot Timeout

## Problem
Railway is timing out when trying to snapshot your repository. This is usually caused by:
- Large files in the repository (like `.mvn-bin` directory with full Maven installation)
- Too many files being copied
- Network issues

## Solution Applied

### 1. Updated `.dockerignore`
I've updated `.dockerignore` to exclude:
- `.mvn-bin/` directory (huge Maven installation)
- Build artifacts (`target/`, `node_modules/`, etc.)
- IDE files
- Documentation files
- Deployment scripts

### 2. Updated `.gitignore`
Added `.mvn-bin/` to `.gitignore` to prevent it from being tracked.

### 3. Optimized Dockerfile
- Added Maven dependency caching for faster builds
- Used multi-stage build (already was there)

## Next Steps

### Option 1: Remove .mvn-bin from Git (Recommended)

The `.mvn-bin` directory shouldn't be in your repository. Remove it:

```bash
# Remove from git tracking (but keep locally)
git rm -r --cached .mvn-bin

# Commit the change
git commit -m "Remove .mvn-bin from repository"

# Push to GitHub
git push origin main
```

### Option 2: Wait and Retry

Sometimes Railway just needs a few minutes. Try again in 5-10 minutes.

### Option 3: Use Railway CLI (Alternative)

If web deployment keeps timing out, use Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Deploy
railway up
```

### Option 4: Reduce Repository Size

Check repository size:
```bash
git count-objects -vH
```

If it's very large, consider:
- Removing large files from history (use `git filter-branch` or BFG Repo-Cleaner)
- Using Git LFS for large files
- Splitting into smaller repositories

## What Changed

1. **`.dockerignore`** - Now excludes `.mvn-bin/` and other unnecessary files
2. **`.gitignore`** - Added `.mvn-bin/` to prevent future commits
3. **`Dockerfile`** - Optimized with dependency caching

## Verification

After removing `.mvn-bin`, check repository size:
```bash
du -sh .git
```

The repository should be much smaller now.

## Railway Settings

If issues persist, check Railway settings:
1. Go to your Railway project
2. Settings → Build
3. Make sure "Build Command" is empty (uses Dockerfile)
4. Make sure "Start Command" is empty (uses Dockerfile ENTRYPOINT)

## Alternative: Use Nixpacks Instead

If Docker continues to have issues, Railway can use Nixpacks:
1. Delete or rename `Dockerfile` temporarily
2. Railway will auto-detect Java/Maven
3. Set build command: `mvn clean package -DskipTests`
4. Set start command: `java -jar target/taxi-booking-system-0.0.1-SNAPSHOT.jar`

But Docker is usually better for production.
