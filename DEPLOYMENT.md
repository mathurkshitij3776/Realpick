# Realpick Deployment Guide

## Prerequisites
- GitHub account
- Railway account (for backend + PostgreSQL)
- Vercel account (for frontend)

## Backend Deployment (Railway)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `realpick-software-discovery` repository
4. Select the `server` directory as the root

### Step 3: Add PostgreSQL Database
1. In your Railway project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically create a PostgreSQL database
4. Copy the `DATABASE_URL` from the database settings

### Step 4: Configure Environment Variables
In Railway project settings, add these variables:
```
DATABASE_URL=<copied from PostgreSQL database>
JWT_SECRET=<generate a random secret key>
NODE_ENV=production
PORT=5000
CORS_ORIGIN=<your Vercel frontend URL>
```

### Step 5: Deploy
1. Railway will automatically deploy your backend
2. Note your backend URL (e.g., `https://realpick-production.up.railway.app`)

### Step 6: Run Database Migrations
In Railway terminal:
```bash
npx prisma migrate deploy
npx prisma generate
```

---

## Frontend Deployment (Vercel)

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 2: Import Project
1. Click "Add New" → "Project"
2. Import your GitHub repository
3. Vercel will auto-detect Vite configuration

### Step 3: Configure Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (root of repo)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### Step 4: Add Environment Variables
In Vercel project settings → Environment Variables:
```
VITE_API_URL=<your Railway backend URL>
```

### Step 5: Deploy
1. Click "Deploy"
2. Vercel will build and deploy your frontend
3. Your app will be live at `https://your-app.vercel.app`

---

## Post-Deployment

### Update CORS Origin
Go back to Railway and update `CORS_ORIGIN` with your Vercel URL:
```
CORS_ORIGIN=https://your-app.vercel.app
```

### Test Your Application
1. Visit your Vercel URL
2. Test signup/login
3. Test product submission
4. Verify database persistence

---

## Troubleshooting

### Backend Issues
- Check Railway logs for errors
- Verify DATABASE_URL is correct
- Ensure migrations ran successfully

### Frontend Issues
- Check browser console for API errors
- Verify VITE_API_URL is correct
- Check CORS settings in backend

### Database Issues
- Verify PostgreSQL is running in Railway
- Check connection string format
- Run migrations manually if needed

---

## Custom Domain (Optional)

### Frontend (Vercel)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Backend (Railway)
1. Go to Project Settings → Domains
2. Add custom domain
3. Update CORS_ORIGIN accordingly

---

## Monitoring

### Railway
- View logs in real-time
- Monitor database usage
- Check deployment history

### Vercel
- View deployment logs
- Monitor analytics
- Check performance metrics

---

## Need Help?
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
