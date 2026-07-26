# Undertow: frontend (Phase 1)

React + TypeScript (strict) + Vite. Class-based domain/service layer:
components never call `fetch` directly, they go through a `*Service`
class, which goes through `ApiClient`, which turns raw JSON into
`domain/*` model classes.

## Structure
```
src/
  domain/     Project, Category, Media: immutable value classes
  api/        ApiClient, ApiError: the only place fetch() is called
  services/   ProjectService, InquiryService: repository-style
  config/     AppConfig: singleton env access
  pages/      route-level components
  components/ shared UI pieces (add as Phase 1 UI work grows)
```

## Local setup
```bash
npm install
cp .env.example .env.local   # point VITE_API_BASE_URL at your local/Railway backend
npm run dev
```

## GitHub Pages deploy
1. Repo Settings → Pages → Source: GitHub Actions.
2. Repo Settings → Environments → `github-pages` → add variable
   `VITE_API_BASE_URL` pointing at the Railway backend
   (e.g. `https://undertow-production.up.railway.app/api/v1`).
3. Push to `main`: `.github/workflows/deploy.yml` builds and deploys.
4. If this is a **project page** (`username.github.io/undertow`), the
   `base: "/undertow/"` in `vite.config.ts` and `basename="/undertow"`
   in `main.tsx` are already set correctly. If it becomes a custom
   domain instead, change both to `"/"`.

## CORS note
The Django backend's `CORS_ALLOWED_ORIGINS` must include this site's
origin (`https://<username>.github.io`, not the full path) or the
contact form and portfolio fetches will fail silently in the browser console.
