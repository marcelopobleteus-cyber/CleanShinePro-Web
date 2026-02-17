# CleanShine Pro - Deployment Guide

This project is a static React application built with Vite, optimized for Netlify or Cloudflare Pages.

## Project Overview
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Routing:** Client-side only (SPA)
- **Forms:** Netlify Forms (compatible) or direct API integration ready.

## Local Development
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment Instructions (Netlify)

1. **Connect Repository:**
   - Log in to Netlify and click "Add new site" > "Import an existing project".
   - Select your GitHub repository.

2. **Build Settings:**
   - **Base directory:** `/` (root)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **Essential Configuration:**
   - Ensure the `_redirects` file is present in the `public` folder (or created purely for SPA routing) to handle client-side routing on refresh.
   - *Note:* If you don't have a `_redirects` file, create one in `public/_redirects` with the following content:
     ```
     /*  /index.html  200
     ```

## Deployment Instructions (Cloudflare Pages)

1. **Connect Repository:**
   - Log in to Cloudflare Dashboard > Pages > Create a project.
   - Connect your Git provider.

2. **Build Settings:**
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`

## Post-Deployment
- Verify the **Booking Form** submission.
- Check **SEO meta tags** on `index.html` and `service-areas`.
- Validate **Schema.org** implementation using [Google Rich Results Test](https://search.google.com/test/rich-results).
