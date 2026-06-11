# Gebeya Hub — Retail Dashboard

A small full-stack retail dashboard for tracking products, sales and store operations.

This repository contains two folders:

- `backend` — Node/Express API with MongoDB (Mongoose)
- `frontend` — Reac + Vite single-page app (TailwindCSS + React Router)

**Login credentials**
- Company password:`password123`

## Key features

- Product CRUD (create, read, update, delete)
- Sales recording (checkout) and listing
- Simple company login (front-end local auth) and protected routes
- Clean admin-style UI for inventory and sales

## Tech stack

- Backend: Node.js, Express, Mongoose (MongoDB), dotenv, CORS
- Frontend: React (18+), Vite, react-router-dom, react-icons, TailwindCSS

## Quick setup

Requirements:
- Node.js (16+ recommended)
- npm or yarn
- A running MongoDB instance or MongoDB Atlas URI

1. Clone the repo and change into the workspace root

2. Backend

```bash
cd backend
npm install
# Create a .env file with MONGO_URI (and optionally PORT)
# .env example:
# MONGO_URI=mongodb://localhost:27017/gebeya
# PORT=5000

# Run development server (nodemon)
npm run dev
# or start
npm start
```

The backend API endpoints are mounted at:
- `GET /` — test route
- `GET/POST/PUT/DELETE /api/products` — product routes
- `GET/POST/DELETE /api/sales` — sales routes

3. Frontend

```bash
cd frontend
npm install
# Optionally set VITE_API_URL in an .env file for the front-end to point to the backend API
# Example .env:
# VITE_API_URL=http://localhost:5000/api

npm run dev
```

Open the app at the URL Vite prints (usually `http://localhost:5173`).

**Login credentials**
- Company password: `password123`

Notes:
- By default the frontend uses `VITE_API_URL` or falls back to `/api` (useful when serving front and API from the same origin).

## Build for production

Frontend production build:

```bash
cd frontend
npm run build
# preview build locally
npm run preview
```

If you change UI text or components and want the `dist` bundle updated, re-run the frontend build and redeploy the static files.

## Environment variables

- Backend (`backend/.env`):
  - `MONGO_URI` (required) — MongoDB connection string
  - `PORT` (optional) — server port (defaults to 5000)

- Frontend (`frontend/.env`):
  - `VITE_API_URL` (optional) — base URL for API requests (e.g. `http://localhost:5000/api`)

## Project structure (important files)

- `backend/`
  - `server.js` — application entry
  - `config/db.js` — MongoDB connection
  - `routes/` — Express route files (`productRoutes.js`, `saleRoutes.js`)
  - `controllers/` — request handlers
  - `models/` — Mongoose models (`Product.js`, `Sale.js`)

- `frontend/`
  - `src/main.jsx`, `src/App.jsx` — app entry and routing
  - `src/pages/` — top-level pages (Login, Dashboard, Products, Sales...)
  - `src/components/` — reusable UI components
  - `src/services/api.js` — front-end API wrapper (uses `VITE_API_URL`)

## Troubleshooting

- Eye icon / toggle not appearing in login password field?
  - Ensure `react-icons` is installed in `frontend`:

```bash
cd frontend
npm install react-icons
```

- If API calls return CORS or connection errors, verify:
  - Backend is running and `MONGO_URI` is correct
  - `VITE_API_URL` is pointing to the backend, or the frontend is being served from the same origin as the API

## Contributing

- Open issues or PRs for improvements, bug fixes, or feature requests.
- Keep changes scoped and include tests where practical.

## License

This repository does not include a license by default. Add a `LICENSE` file (for example MIT) if you want to make the project open source.

---

If you want, I can:
- Add a `README` directly to the `frontend` or `backend` folder as well
- Create a minimal `Dockerfile` / docker-compose to run both services
- Add a `.env.example` file for both backend and frontend

Tell me which of the above you'd like me to add next.