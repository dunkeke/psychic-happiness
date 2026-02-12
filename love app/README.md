# Love App (React + Vite)

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Build output is generated under `love app/dist`.

## Deploy to GitHub Pages

This repository includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

### One-time GitHub settings

1. Open **Settings → Pages** in your GitHub repository.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.

### How deployment is triggered

- Every push to the `main` branch.
- Manual trigger via **Actions → Deploy love app to GitHub Pages → Run workflow**.

The workflow will:

1. Install dependencies with `npm ci`.
2. Build the Vite app with `npm run build` (working directory: `love app`).
3. Publish `love app/dist` to GitHub Pages.
