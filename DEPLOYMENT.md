# Taxi Booking System - Deployment Guide

This guide will help you deploy your Taxi Booking System to production. The system consists of:
- **Backend**: Spring Boot API (Java)
- **Frontend**: React + TypeScript + Vite
- **Database**: PostgreSQL (production)

## 🚀 Quick Deployment Options

### Option 1: Vercel (Frontend) + Railway/Render (Backend) - **Recommended for Beginners**

**Frontend on Vercel:**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "New Project" and import your repository
4. Set root directory to `frontend`
5. Add environment variable: `VITE_API_URL=https://your-backend-url.com/api`
6. Deploy!

**Backend on Railway:**
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will detect the Spring Boot app
5. Add PostgreSQL database (Railway will auto-configure)
6. Add environment variables:
   - `SPRING_DATASOURCE_URL` (auto-set by Railway)
   - `SPRING_DATASOURCE_USERNAME` (auto-set by Railway)
   - `SPRING_DATASOURCE_PASSWORD` (auto-set by Railway)
   - `SPRING_DATASOURCE_DRIVER=org.postgresql.Driver`
   - `SPRING_JPA_DIALECT=org.hibernate.dialect.PostgreSQLDialect`
   - `ALLOWED_ORIGINS=https://your-frontend-url.vercel.app`
   - `PORT=8085`
7. Deploy!

**Backend on Render:**
1. Go to [render.com](https://render.com) and sign in
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Settings:
   - Build Command: `mvn clean package -DskipTests`
   - Start Command: `java -jar target/taxi-booking-system-0.0.1-SNAPSHOT.jar`
   - Environment: `Java`
5. Add PostgreSQL database (Render → New → PostgreSQL)
6. Add environment variables (same as Railway above)
7. Deploy!

---

### Option 2: Docker Compose (VPS/Cloud Server)

Perfect for deploying on AWS EC2, DigitalOcean, Linode, or any VPS.

**Prerequisites:**
- Docker and Docker Compose installed
- Domain name (optional, can use IP)

**Steps:**
1. Clone your repository on the server
2. Copy `.env.example` to `.env` and configure
3. Run: `docker-compose up -d`
4. Your app will be available at `http://your-server-ip`

See `docker-compose.yml` for configuration.

---

### Option 3: Full Stack on Railway/Render

Deploy both frontend and backend on the same platform.

**Railway:**
1. Create two services from the same repo
2. Frontend service: Set root directory to `frontend`
3. Backend service: Set root directory to root
4. Add PostgreSQL database
5. Configure environment variables
6. Link services together

---

## 📋 Pre-Deployment Checklist

- [ ] Update `VITE_API_URL` in frontend to production backend URL
- [ ] Set up PostgreSQL database
- [ ] Configure CORS origins in backend
- [ ] Set all environment variables
- [ ] Test locally with Docker Compose
- [ ] Ensure `.env` files are in `.gitignore`

---

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=8085
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/taxidb
SPRING_DATASOURCE_USERNAME=your_db_user
SPRING_DATASOURCE_PASSWORD=your_db_password
SPRING_DATASOURCE_DRIVER=org.postgresql.Driver
SPRING_JPA_DIALECT=org.hibernate.dialect.PostgreSQLDialect
ALLOWED_ORIGINS=https://your-frontend-url.vercel.app,http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.com/api
```

---

## 🐳 Docker Deployment

### Build and Run Locally
```bash
# Build backend
docker build -t taxi-backend .

# Build frontend
cd frontend
docker build -t taxi-frontend .

# Or use docker-compose
docker-compose up -d
```

### Production Docker Deployment
1. Use `docker-compose.prod.yml` (create this file)
2. Set up reverse proxy (Nginx) for SSL
3. Configure domain name
4. Set up SSL certificates (Let's Encrypt)

---

## 🌐 Platform-Specific Guides

### Vercel (Frontend)
1. Install Vercel CLI: `npm i -g vercel`
2. Navigate to frontend: `cd frontend`
3. Run: `vercel`
4. Follow prompts
5. Set environment variables in Vercel dashboard

### Railway (Backend)
1. Install Railway CLI: `npm i -g @railway/cli`
2. Run: `railway login`
3. Run: `railway init`
4. Run: `railway up`
5. Add PostgreSQL: `railway add postgresql`
6. Set environment variables: `railway variables`

### Render (Backend)
1. Connect GitHub repository
2. Select "Web Service"
3. Configure build and start commands
4. Add PostgreSQL database
5. Set environment variables in dashboard

---

## 🔒 Security Checklist

- [ ] Use HTTPS (SSL certificates)
- [ ] Set strong database passwords
- [ ] Configure CORS properly
- [ ] Use environment variables (never commit secrets)
- [ ] Enable database backups
- [ ] Set up monitoring/logging
- [ ] Configure firewall rules

---

## 🐛 Troubleshooting

### Backend won't start
- Check database connection string
- Verify environment variables are set
- Check logs: `docker logs <container-name>`

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS configuration in backend
- Ensure backend is running and accessible

### Database connection errors
- Verify PostgreSQL is running
- Check connection string format
- Ensure database exists
- Verify credentials

---

## 📞 Need Help?

- Check platform documentation (Vercel, Railway, Render)
- Review Docker logs
- Test locally first with Docker Compose
- Verify environment variables are set correctly

---

## 🎯 Recommended: Vercel + Railway

**Why this combination?**
- ✅ Free tiers available
- ✅ Easy GitHub integration
- ✅ Automatic deployments
- ✅ Built-in SSL
- ✅ Good documentation

**Estimated time:** 15-30 minutes

**Cost:** Free (with limitations) or ~$5-20/month for production use
