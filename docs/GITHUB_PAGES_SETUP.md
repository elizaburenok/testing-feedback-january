# GitHub Pages Deployment with GitHub Actions - Complete Guide

This guide explains how we deployed this React + Vite project to GitHub Pages using GitHub Actions workflows.

## Overview

We used **GitHub Actions** to automatically build and deploy the project whenever code is pushed to the `main` branch. The workflow builds the Vite app and deploys it to the `gh-pages` branch, which GitHub Pages serves.

---

## Step-by-Step Setup

### 1. Prepare Your Project

#### 1.1 Configure Vite Base Path

In `vite.config.ts`, set the `base` path to match your repository name:

```typescript
export default defineConfig({
  base: '/feedback-testing/',  // Replace with your repo name
  // ... other config
});
```

**Important:** If your repo is `username.github.io` (user/organization page), use `base: '/'` instead.

#### 1.2 Fix Routing for GitHub Pages

GitHub Pages serves static files and doesn't support server-side routing. Use `HashRouter` instead of `BrowserRouter`:

**In `src/App.tsx`:**
```typescript
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* your routes */}
      </Routes>
    </HashRouter>
  );
};
```

**Why?** `BrowserRouter` uses HTML5 history API which requires server configuration. `HashRouter` uses URL hashes (`#/path`) which work with static hosting.

---

### 2. Create GitHub Actions Workflow

#### 2.1 Create Workflow File

Create the file: `.github/workflows/deploy.yml`

```yaml
name: Deploy Vite app to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**What this does:**
- **Triggers:** Runs on push to `main` branch OR manually via "Run workflow" button
- **Builds:** Installs dependencies and builds your Vite app
- **Deploys:** Pushes the `dist` folder to `gh-pages` branch

#### 2.2 Commit and Push

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deploy workflow"
git push origin main
```

---

### 3. Configure GitHub Repository Settings

#### 3.1 Enable GitHub Actions Write Permissions

1. Go to your repository → **Settings** → **Actions** → **General**
2. Scroll to **"Workflow permissions"**
3. Select **"Read and write permissions"**
4. Check **"Allow GitHub Actions to create and approve pull requests"** (optional)
5. Click **Save**

**Why?** The workflow needs permission to push to the `gh-pages` branch.

**Alternative:** If you don't see this setting, use a Personal Access Token:
1. Create a token with `repo` and `workflow` scopes
2. Add it as a secret: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**
3. Name: `GH_PAGES_TOKEN`
4. Update workflow to use: `github_token: ${{ secrets.GH_PAGES_TOKEN }}`

#### 3.2 Configure GitHub Pages Source

1. Go to **Settings** → **Pages**
2. Under **"Build and deployment"**:
   - **Source:** Select **"GitHub Actions"** (not "Deploy from a branch")
3. Save

---

### 4. Deploy Your Site

#### 4.1 Automatic Deployment

Every time you push to `main`, the workflow runs automatically:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

#### 4.2 Manual Deployment

1. Go to **Actions** tab
2. Click **"Deploy Vite app to GitHub Pages"** in the sidebar
3. Click **"Run workflow"** button
4. Select branch: `main`
5. Click **"Run workflow"**

#### 4.3 Check Deployment Status

- **Actions tab:** See workflow progress and status
- **Settings → Pages:** See deployment time and site URL

---

### 5. Access Your Site

After the workflow completes successfully:

1. Go to **Settings** → **Pages**
2. Your site URL will be displayed:
   ```
   https://elizaburenok.github.io/feedback-testing/
   ```

**Note:** It may take 1-2 minutes after workflow completion for the site to be available.

---

## Troubleshooting

### Workflow Fails with Permission Error

**Error:** `Permission to ... denied to github-actions[bot]`

**Solution:** Enable write permissions (see Step 3.1) or use a Personal Access Token.

### Site Shows 404 or Blank Page

**Possible causes:**
1. **Wrong base path:** Check `vite.config.ts` - `base` must match your repo name
2. **Routing issue:** Make sure you're using `HashRouter`, not `BrowserRouter`
3. **Browser cache:** Hard refresh (`Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows)

### Changes Don't Appear

1. Check **Actions** tab - workflow must complete successfully (green checkmark)
2. Check **Settings → Pages** - deployment time should update
3. Hard refresh your browser
4. Wait 1-2 minutes for GitHub Pages to update

### Workflow Runs But Site Doesn't Update

- Verify the workflow completed successfully
- Check if `dist` folder is being built correctly
- Ensure GitHub Pages source is set to "GitHub Actions"

---

## Workflow File Explanation

```yaml
on:
  push:
    branches: [ main ]        # Auto-run on push to main
  workflow_dispatch:          # Allow manual trigger

jobs:
  deploy:
    runs-on: ubuntu-latest    # Use Ubuntu runner
    
    steps:
      - checkout              # Get your code
      - setup-node            # Install Node.js
      - install deps          # npm ci
      - build                 # npm run build
      - deploy                # Push dist/ to gh-pages
```

---

## Key Points to Remember

1. ✅ **Base path** in `vite.config.ts` must match repo name
2. ✅ **Use HashRouter** for routing (not BrowserRouter)
3. ✅ **Enable write permissions** for GitHub Actions
4. ✅ **Set Pages source** to "GitHub Actions"
5. ✅ **Workflow runs automatically** on every push to `main`
6. ✅ **Manual trigger** available via "Run workflow" button

---

## Your Project URLs

- **Repository:** https://github.com/elizaburenok/feedback-testing
- **Live Site:** https://elizaburenok.github.io/feedback-testing/
- **Workflow:** https://github.com/elizaburenok/feedback-testing/actions

---

## Summary

We successfully set up:
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)
- ✅ Automatic deployment on push to `main`
- ✅ Manual deployment option via "Run workflow"
- ✅ Fixed routing for static hosting (HashRouter)
- ✅ Configured base path for GitHub Pages
- ✅ Enabled necessary permissions

Your site now automatically updates whenever you push changes to the `main` branch!
