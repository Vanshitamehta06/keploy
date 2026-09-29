# Deployment Guide: GitHub & Vercel in 2 Minutes

This guide walks you through pushing this codebase to your personal GitHub account and deploying it live on Vercel to obtain the two required deliverable links for the Keploy DevRel Candidate Assignment:

1. **Public GitHub Repository Link**
2. **Live Vercel Deployment Link**

---

## Step 1: Push Source Code to GitHub

1. Open [GitHub](https://github.com/new) and create a **new public repository** named:
   `keploy-go-quickstart-tutorial` (or any name you prefer).
   *(Do NOT initialize with a README, .gitignore, or license, as we already have them).*

2. In your terminal inside this project directory (`c:\Users\vansh\OneDrive\Desktop\keploy`), run:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Keploy DevRel documentation website with Next.js and MDX"
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/keploy-go-quickstart-tutorial.git
   git push -u origin main
   ```

3. Your public GitHub repository is now live! Copy the link:
   `https://github.com/<YOUR_GITHUB_USERNAME>/keploy-go-quickstart-tutorial`

---

## Step 2: Deploy to Vercel (Free & Instant)

### Option A: Via Vercel Web Dashboard (Recommended)

1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click **"Add New..."** -> **"Project"**.
3. Under "Import Git Repository", find your `keploy-go-quickstart-tutorial` repository and click **Import**.
4. Vercel automatically detects Next.js framework settings:
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Build Command: `next build`
   - Output Directory: Next.js default (`.next`)
5. Click **"Deploy"**.
6. In about 45 seconds, the build will complete, and Vercel will provide your live URL:
   `https://keploy-go-quickstart-tutorial.vercel.app` (or similar).

---

### Option B: Via Vercel CLI

If you prefer using the terminal, you can run:

```bash
npx vercel
```

- When prompted `Set up and deploy?`, press `y`.
- Accept the default scope and project name.
- For production deployment, run:
  ```bash
  npx vercel --prod
  ```
- Copy the provided production URL.

---

## Deliverables Checklist for Submission

When replying back to the Keploy team, provide:

1. **GitHub Repository**: `https://github.com/<YOUR_GITHUB_USERNAME>/keploy-go-quickstart-tutorial`
2. **Live Vercel Site**: `https://<YOUR-PROJECT-NAME>.vercel.app`
