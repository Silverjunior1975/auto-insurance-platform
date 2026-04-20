# Auto Insurance Platform

Production-ready web platform for auto insurance lead generation.

## Features

- Premium homepage with clear quote CTA
- Lead capture form with all required fields + TCPA consent
- Thank-you confirmation page
- SQLite-backed lead storage for local development
- Production-ready Postgres support for Vercel deployments
- Admin login (password-protected)
- Admin dashboard with newest-first leads
- Lead status workflow: `New`, `Contacted`, `Sold`
- CSV export from admin dashboard
- SEO pages:
  - Cheap Car Insurance
  - SR-22 Insurance
  - Low Down Payment Insurance
  - DUI Insurance Help
- Legal pages:
  - Privacy Policy
  - Terms

## Tech stack

- Next.js (App Router, TypeScript)
- Tailwind CSS
- SQLite (`better-sqlite3`) for local
- Postgres (Neon/Vercel-managed) for production

## Quick start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Edit `.env.local` with secure values:

   - `ADMIN_PASSWORD`: password for `/admin/login`
   - `ADMIN_SESSION_SECRET`: long random secret used to sign session cookies
   - `NEXT_PUBLIC_SITE_URL`: your local or public URL (for metadata/sitemap)

4. Run development server:

   ```bash
   npm run dev
   ```

5. Open:

   - Public site: `http://localhost:3000`
   - Admin login: `http://localhost:3000/admin/login`

## Production run

```bash
npm run build
npm start
```

## Data storage

- Local dev: leads are stored in `data/leads.db` (SQLite).
- Production: set `DATABASE_URL` to Postgres (recommended on Vercel).
- `data/` is ignored by git.

## Fast Vercel deployment

### 1) Deploy

1. Push this project to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. During setup, keep framework as **Next.js** and deploy.

### 2) Set required production env vars

In Vercel Project Settings -> Environment Variables, add:

- `ADMIN_PASSWORD` = strong admin password
- `ADMIN_SESSION_SECRET` = long random secret (at least 32 chars)
- `DATABASE_URL` = Postgres connection string (Neon or Vercel marketplace Postgres)
- `NEXT_PUBLIC_SITE_URL` = your production URL, e.g. `https://your-domain.com`

Then redeploy.

### 3) Admin access in production

- Admin login URL: `https://your-domain.com/admin/login`
- Use `ADMIN_PASSWORD` to sign in.

### 4) Post-deploy lead form test

1. Visit home page and submit a real test lead.
2. Confirm redirect to `/thank-you`.
3. Login to `/admin/login`.
4. Verify new lead appears at top of dashboard.
5. Change status (`New` -> `Contacted`) and save.
6. Click **Export CSV** and verify row exists in downloaded file.

## Production checklist

- Deploy to Vercel completed
- Env vars set (`ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`)
- Custom domain connected (optional but recommended)
- Admin login verified
- Lead submission flow verified
- CSV export verified
