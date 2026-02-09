# 🚀 Quick Start Guide - Deploy Your Taxi Booking System

## Option 1: Deploy Locally with Docker (5 minutes)

### Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop/))

### Steps

1. **Open PowerShell/Terminal in project directory**

2. **Run the deployment script:**
   ```powershell
   # Windows
   .\deploy.ps1
   
   # Or manually:
   docker-compose up -d --build
   ```

3. **Access your application:**
   - Frontend: http://localhost
   - Backend API: http://localhost:8085/api

4. **View logs:**
   ```powershell
   docker-compose logs -f
   ```

5. **Stop the application:**
   ```powershell
   docker-compose down
   ```

---

## Option 2: Deploy to Production (Vercel + Railway) - 15 minutes

### Step 1: Deploy Backend to Railway

1. **Push your code to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to [railway.app](https://railway.app)**
   - Sign in with GitHub
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL Database:**
   - Click "+ New" → "Database" → "Add PostgreSQL"
   - Railway will auto-configure the connection

4. **Set Environment Variables:**
   - Go to your service → Variables
   - Add these variables:
     ```
     PORT=8085
     SPRING_DATASOURCE_DRIVER=org.postgresql.Driver
     SPRING_JPA_DIALECT=org.hibernate.dialect.PostgreSQLDialect
     ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
     ```
   - Railway auto-sets: `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`

5. **Get your backend URL:**
   - Railway will provide a URL like: `https://your-app.up.railway.app`
   - Copy this URL (you'll need it for frontend)

### Step 2: Deploy Frontend to Vercel

1. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Import your GitHub repository

2. **Configure Project:**
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Add Environment Variable:**
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.up.railway.app/api`
   - Replace with your actual Railway backend URL

4. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete
   - Vercel will give you a URL like: `https://your-app.vercel.app`

### Step 3: Update Backend CORS

1. **Go back to Railway**
2. **Update Environment Variable:**
   - `ALLOWED_ORIGINS` = `https://your-app.vercel.app`
   - Add multiple origins separated by commas if needed
3. **Redeploy** (Railway auto-redeploys on variable change)

### Step 4: Test Your Deployment

- Visit your Vercel frontend URL
- Try registering a user
- Try booking a taxi
- Check Railway logs if something doesn't work

---

## Option 3: Deploy Both to Render

1. **Go to [render.com](https://render.com)**
   - Sign in with GitHub

2. **Create PostgreSQL Database:**
   - New → PostgreSQL
   - Name: `taxi-postgres`
   - Plan: Free (or paid)

3. **Deploy Backend:**
   - New → Web Service
   - Connect your GitHub repo
   - Settings:
     - **Name:** `taxi-backend`
     - **Environment:** `Java`
     - **Build Command:** `mvn clean package -DskipTests`
     - **Start Command:** `java -jar target/taxi-booking-system-0.0.1-SNAPSHOT.jar`
   - Add Environment Variables (use database connection from step 2)
   - Deploy!

4. **Deploy Frontend:**
   - New → Static Site
   - Connect your GitHub repo
   - Settings:
     - **Root Directory:** `frontend`
     - **Build Command:** `npm install && npm run build`
     - **Publish Directory:** `dist`
   - Add Environment Variable: `VITE_API_URL` = `https://your-backend.onrender.com/api`
   - Deploy!

---

## 🐛 Troubleshooting

### Backend won't start
- Check Railway/Render logs
- Verify database connection string
- Ensure all environment variables are set

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings in backend
- Ensure backend URL is accessible (try opening in browser)

### Database connection errors
- Verify PostgreSQL is running
- Check connection credentials
- Ensure database exists

---

## 📝 Environment Variables Reference

### Backend
```
PORT=8085
SPRING_DATASOURCE_URL=jdbc:postgresql://host:port/dbname
SPRING_DATASOURCE_USERNAME=username
SPRING_DATASOURCE_PASSWORD=password
SPRING_DATASOURCE_DRIVER=org.postgresql.Driver
SPRING_JPA_DIALECT=org.hibernate.dialect.PostgreSQLDialect
ALLOWED_ORIGINS=https://your-frontend-url.com
```

### Frontend
```
VITE_API_URL=https://your-backend-url.com/api
```

---

## ✅ Success Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is deployed and accessible
- [ ] Database is connected
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Can register a user
- [ ] Can login
- [ ] Can book a taxi

---

## 🎉 You're Live!

Your Taxi Booking System is now deployed! Share your frontend URL with users.

**Need help?** Check `DEPLOYMENT.md` for detailed information.
