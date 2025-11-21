# CORPORATE DOCUMENT MANAGEMENT SYSTEM (CDMS) — Client

This repository contains the React (Vite) frontend for the CORPORATE DOCUMENT MANAGEMENT SYSTEM (CDMS). The client provides user authentication, PDF/document upload and preview, document listing and management, and content/post management that communicates with a backend API.

> Client-only application — a running backend API is required for full functionality.

**Table of Contents**

- Project Overview
- Quick Start
- Environment Variables
- API Documentation
- Features Implemented
- Project Structure & Key Files
- Available Scripts
- Troubleshooting
- Contributing

## Project Overview

- **Name**: CORPORATE DOCUMENT MANAGEMENT SYSTEM (CDMS)
- **Purpose**: A frontend UI for uploading, previewing and managing corporate documents (PDFs) and associated posts/content. The client handles authentication and interacts with a RESTful backend for storage and metadata.
- **Stack**: React + Vite, Context API for global state, custom `useApi` hook for backend calls, and a small PDF worker for in-browser previews.

This repository is the client portion only. To use the app you need the backend API (authentication, documents/posts endpoints, and file storage).

## Quick Start

### Prerequisites

- Node.js v16 or newer
- npm (or yarn)
- A running backend API and its base URL

### Install & Run (development)

Open PowerShell in the project root and run:

```powershell
cd c:\Users\denis\Documents\mern-CDMS\client
npm install
npm run dev
```

The dev server typically serves at `http://localhost:5173`.

### Build for Production

```powershell
npm run build
npm run preview
```

## Environment Variables

- `VITE_API_URL` — Base URL of the backend API (e.g. ` http://localhost:5000`).

Create a `.env` file at the project root or set the variable in your environment. Example `.env`:

```text
VITE_API_URL= http://localhost:5000
```

In client code, access it with `import.meta.env.VITE_API_URL`.

## API Documentation

The client expects a RESTful backend. Replace `{{VITE_API_URL}}` with your configured API URL.

- **POST /api/auth/register**
	- Registers a new user.
	- Body: `{ "username": "...", "email": "...", "password": "..." }`
	- Response: `{ user: {...}, token: "..." }`

- **POST /api/auth/login**
	- Authenticates and returns a JWT token.
	- Body: `{ "email": "...", "password": "..." }`
	- Response: `{ user: {...}, token: "..." }`

- **GET /api/auth/me**
	- Returns current user information. Requires `Authorization: Bearer <token>`.

- **GET /api/documents**
	- Lists documents. Response: `[{ _id, title, filename, createdAt, ... }]`.

- **GET /api/documents/:id**
	- Retrieves document metadata or a streaming URL for preview.

- **POST /api/documents**
	- Upload a document (multipart/form-data)
	- Form fields: `file` (binary PDF), `title`, `description` (optional)
	- Headers: `Authorization: Bearer <token>` (if protected)

- **DELETE /api/documents/:id**
	- Deletes a document (requires `Authorization`).

- **GET /api/posts**
	- Lists posts/content.

- **GET /api/posts/:id**
	- Retrieves a single post.

- **POST /api/posts**
	- Creates a post (requires `Authorization`).

- **PUT /api/posts/:id**
	- Updates a post (requires `Authorization`).

- **DELETE /api/posts/:id**
	- Deletes a post (requires `Authorization`).

Notes
- All protected endpoints expect `Authorization: Bearer <token>` in the request headers.
- Token management is handled in `src/context/AuthContext.jsx`.

Example curl (login):

```bash
curl -X POST "${VITE_API_URL}/api/auth/login" -H "Content-Type: application/json" \
	-d '{"email":"user@example.com","password":"secret"}'
```

Example curl (upload document):

```bash
curl -X POST "${VITE_API_URL}/api/documents" \
	-H "Authorization: Bearer <token>" \
	-F "file=@/path/to/document.pdf" -F "title=Quarterly Report" -F "description=Q1 results"
```

## Features Implemented

- **Authentication** — Register/login flows and token storage (`src/context/AuthContext.jsx`).
- **Document Upload** — Upload PDFs with form handling (`src/components/UploadDocument.jsx`).
- **Document Listing** — List and paginate documents (`src/components/DocumentList.jsx`).
- **PDF Preview** — Inline PDF preview modal using `pdf-worker.js` (`src/components/PdfModal.jsx`).
- **Posts Management** — Create, view, edit and delete posts (`src/components/PostView.jsx`, `src/context/PostContext.jsx`).
- **Theme Support** — Light/dark theme toggling (`src/context/ThemeContext.jsx`, `src/theme.css`).
- **Reusable API Hook** — `src/hooks/useApi.js` centralizes API calls and injects auth headers.

## Project Structure & Key Files

```
src/
├─ components/
│  ├─ UploadDocument.jsx
│  ├─ DocumentList.jsx
│  ├─ PdfModal.jsx
│  └─ PostView.jsx
├─ context/
│  ├─ AuthContext.jsx
│  ├─ PostContext.jsx
│  └─ ThemeContext.jsx
├─ hooks/
│  └─ useApi.js
├─ pdf-worker.js
├─ App.jsx
└─ main.jsx
```

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build production bundle
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint

## Troubleshooting

- **API unreachable**: Confirm `VITE_API_URL` points to a running backend and CORS is enabled.
- **Auth errors**: Check token storage (localStorage) and validate backend JWT issuance.
- **PDF preview problems**: Ensure the document endpoint returns a valid PDF stream and `pdf-worker.js` is served.

## Contributing

- Contributions welcome — open a PR with a description and screenshots for UI changes.
- Keep this README updated if you change API endpoints or request/response shapes.

---

If you'd like, I can also:

- add a `.env.example` file with `VITE_API_URL` set,
- run the dev server here to confirm the client boots, or
- scaffold a small Express backend mock for local integration testing.

Tell me which next step you want.

