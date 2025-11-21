# Noēma Setup Guide

This guide will walk you through setting up Noēma locally and deploying it to production.

## Table of Contents
1. [Local Development Setup](#local-development-setup)
2. [OpenAI API Configuration](#openai-api-configuration)
3. [Testing the Application](#testing-the-application)
4. [Deployment to Vercel](#deployment-to-vercel)
5. [Troubleshooting](#troubleshooting)

---

## Local Development Setup

### Step 1: Install Dependencies

#### Backend Setup
```bash
cd backend
npm install
```

This will install:
- Express (web server)
- OpenAI SDK (AI integration)
- CORS (cross-origin requests)
- dotenv (environment variables)

#### Frontend Setup
```bash
cd ../frontend
npm install
```

This will install:
- React & React DOM
- React Flow (mind map visualization)
- Tailwind CSS (styling)
- Vite (build tool)
- Axios (HTTP requests)
- Lucide React (icons)

### Step 2: Configure Environment Variables

1. Navigate to the backend directory
2. Copy the example environment file:
   ```bash
   cd backend
   cp .env.example .env
   ```

3. Open `.env` in your text editor and add your credentials:
   ```
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx
   PORT=5000
   NODE_ENV=development
   ```

---

## OpenAI API Configuration

### Getting Your API Key

1. **Sign up or log in** to [OpenAI Platform](https://platform.openai.com/)
2. Navigate to **API Keys** section
3. Click **"Create new secret key"**
4. Copy the key immediately (you won't see it again)
5. Paste it in your `.env` file as `OPENAI_API_KEY`

### Setting Usage Limits (Recommended)

1. Go to **Settings** → **Billing**
2. Set a **hard limit** (e.g., $10/month) to avoid unexpected charges
3. Add a **soft limit** for email notifications

### API Costs

Noēma uses GPT-4o which costs:
- ~$0.01-0.03 per analysis (depending on number of notes)
- 100 analyses ≈ $1-3

---

## Testing the Application

### 1. Start the Backend

```bash
cd backend
npm start
```

You should see:
```
🚀 Noema API server running on http://localhost:5000
📊 Health check: http://localhost:5000/api/health
🔑 OpenAI API Key: ✓ Configured
```

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

### 2. Start the Frontend

In a new terminal:
```bash
cd frontend
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 3. Test the Application

1. Open `http://localhost:3000` in your browser
2. Add at least 3 notes (try these examples):
   - "I want to learn machine learning but don't know where to start"
   - "My team struggles with async communication across timezones"
   - "We need better documentation for our API"
   - "I'm interested in sustainable technology solutions"
   - "Our product lacks user feedback mechanisms"

3. Click **"Generate Insights"**
4. Wait 5-10 seconds for AI analysis
5. Explore:
   - **Notes View**: See themed groups
   - **Mind Map View**: Visual relationships
   - **Insights Panel**: AI-generated connections

---

## Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))

### Step 1: Push to GitHub

```bash
cd noema-project
git init
git add .
git commit -m "Initial commit: Noema project"
git branch -M main
git remote add origin https://github.com/yourusername/noema.git
git push -u origin main
```

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) and log in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

5. Click **"Deploy"**

### Step 3: Deploy Backend

#### Option A: Vercel Serverless Functions

1. Create `api` directory in project root
2. Create `api/analyze.js`:
```javascript
import OpenAI from 'openai';

export default async function handler(req, res) {
  // Move server.js logic here
}
```

#### Option B: Separate Hosting (Railway/Render)

1. Create account on [Railway](https://railway.app) or [Render](https://render.com)
2. Create new project from GitHub repo
3. Set root directory to `backend`
4. Add environment variable `OPENAI_API_KEY`
5. Deploy

### Step 4: Configure Environment Variables

In Vercel dashboard:
1. Go to **Project Settings** → **Environment Variables**
2. Add:
   - `OPENAI_API_KEY`: Your OpenAI key
   - `NODE_ENV`: `production`

### Step 5: Update Frontend API URL

If using separate backend hosting:
1. In `frontend/vite.config.js`, update proxy target to your backend URL
2. Or use environment variable `VITE_API_URL`
3. Redeploy frontend

---

## Troubleshooting

### Backend Issues

**Error: "OpenAI API key is not configured"**
- Check `.env` file exists in `backend` directory
- Verify `OPENAI_API_KEY` is set correctly
- Restart backend server after changing `.env`

**Error: "Invalid OpenAI API key"**
- Confirm key starts with `sk-`
- Check key hasn't been revoked in OpenAI dashboard
- Try generating a new key

**Error: "Rate limit exceeded"**
- Wait a few minutes before trying again
- Check your OpenAI usage dashboard
- Consider upgrading your OpenAI plan

### Frontend Issues

**Blank screen / White page**
- Check browser console for errors (F12)
- Verify backend is running
- Check proxy configuration in `vite.config.js`

**"Failed to fetch" error**
- Ensure backend is running on port 5000
- Check CORS configuration in backend
- Verify no firewall blocking localhost

**Mind map not rendering**
- Ensure you have at least 3 notes
- Check that insights were generated successfully
- Try refreshing the page

### Deployment Issues

**Vercel build failing**
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure `node_modules` is in `.gitignore`

**API calls failing in production**
- Verify environment variables are set in Vercel
- Check API endpoint URLs are correct
- Review CORS settings for production domain

---

## Performance Optimization

### For Better Results

1. **Add more notes**: 5-10 notes produce richer insights
2. **Be specific**: Detailed notes lead to better clustering
3. **Diverse topics**: Mix of subjects reveals interesting connections
4. **Wait for analysis**: Don't spam the generate button

### Cost Optimization

1. **Batch your thoughts**: Add multiple notes before analyzing
2. **Clear old data**: Remove notes you no longer need
3. **Monitor usage**: Check OpenAI dashboard regularly

---

## Development Tips

### Hot Reload
- Both frontend and backend support hot reload
- Changes to React components update instantly
- Backend restarts automatically with `--watch` flag

### Debugging
- Backend logs appear in terminal
- Frontend errors in browser console
- Use React DevTools browser extension

### Customization
- Colors: Edit `tailwind.config.js`
- Fonts: Update Google Fonts in `index.html`
- AI behavior: Modify prompt in `backend/server.js`

---

## Need Help?

- 📖 Read the [README.md](README.md)
- 🐛 [Open an issue](https://github.com/yourusername/noema/issues)
- 💬 Check existing issues for solutions

---

**Happy brainstorming! 🧠✨**
