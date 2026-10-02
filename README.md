# Rec-It

Front desk and admin app for a recreation center, built with React, Vite, Tailwind and Electron.
The API lives in [Rec-It-backend](https://github.com/SanketBaviskar/Rec-It-backend).

## Running locally

1. Start the backend (see its README): `npm run dev` serves `http://localhost:3000/api`, and `npm run seed` creates the `admin@rec-it.com` / `admin123` login.
2. Start the app:

```bash
npm install
npm run dev:react   # web app on http://localhost:5123
npm run dev         # web app + Electron window
```

`VITE_API_BASE_URL` picks the API: `.env` points at the local backend, and `.env.production` is used by `npm run build` and the Electron release builds.

## Checks

```bash
npm run lint
npm run build
npm run test:unit   # Vitest
npm run test:e2e    # Playwright, against the running backend
```

The e2e tests log in with `E2E_EMAIL` / `E2E_PASSWORD` (defaults to the seeded admin).
