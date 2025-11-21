
# CORPORATE DOCUMENT MANAGEMENT SYSTEM (CDMS)

This repository contains the backend server for the CORPORATE DOCUMENT MANAGEMENT SYSTEM (CDMS) — a lightweight MERN-style API to manage documents (PDFs), posts, and categories with user authentication.

**Project overview**
- **Purpose:** Centralize document uploads (PDFs) by department, provide simple content (posts) and category listing, and secure document creation with JWT-based authentication.
- **Backend stack:** `Node.js`, `Express`, `MongoDB` (via `mongoose`), `multer` for file uploads, `jsonwebtoken` for auth.

**Quick Links**
- **Server entry:** `server.js`
- **API base path:** `/api`
- **Uploads directory:** `uploads/` (served at `/uploads`)

**Features implemented**
- **Authentication:** Register and login with email/password; returns JWT.
- **Document management:** Upload PDF files (multipart), list documents, view, update and delete (protected).
- **Posts:** Basic CRUD for posts (title, content, category, image).
- **Categories:** Read-only list of categories (seed script available).
- **File serving:** Uploaded files are served statically from `uploads/`.

**Prerequisites**
- **Node.js:** v16+ recommended.
- **MongoDB:** running instance or MongoDB Atlas connection string.

**Environment variables**
Create a `.env` file in the project root with the following variables:

```
MONGO_URI=mongodb://localhost:27017/cdms
JWT_SECRET=your_jwt_secret
BASE_URL= http://localhost:5000
PORT=5000
```

**Install & run**

1. Install dependencies

```
npm install
```

2. (Optional) Seed default categories

```
node seed.js
```

3. Start server (development)

```
npm run dev
```

4. Start server (production)

```
npm start
```

**API Documentation**

Base URL (local): ` http://localhost:5000`

- **Auth**
	- `POST /api/auth/register` — Register a new user
		- Body (JSON): `{ "email": "user@example.com", "password": "pass123", "department": "HR" }`
		- Response: `{ token, user }`

	- `POST /api/auth/login` — Login existing user
		- Body (JSON): `{ "email": "user@example.com", "password": "pass123" }`
		- Response: `{ token, user }`

- **Documents**
	- `GET /api/documents` — List all documents (public)
		- Response: Array of documents with `uploadedBy` populated (`email`, `department`).

	- `GET /api/documents/:id` — Get document by id (public)

	- `POST /api/documents` — Create/upload a document (protected)
		- Auth: `Authorization: Bearer <token>`
		- Content-Type: `multipart/form-data`
		- Fields:
			- `file` (file): PDF or file to upload
			- `title` (string)
			- `description` (string)
			- `department` (string)
		- Example curl (bash):

```
curl -X POST " http://localhost:5000/api/documents" \
	-H "Authorization: Bearer $TOKEN" \
	-F "file=@/path/to/document.pdf" \
	-F "title=Department Policy" \
	-F "department=HR" \
	-F "description=Policy doc"
```

	- `PUT /api/documents/:id` — Update document metadata (protected)
		- Auth: `Authorization: Bearer <token>`
		- Body (JSON): fields to update (e.g., `{ "title": "New title" }`)

	- `DELETE /api/documents/:id` — Delete a document (protected)
		- Auth: `Authorization: Bearer <token>`

- **Posts**
	- `GET /api/posts` — List posts
	- `GET /api/posts/:id` — Get post by id
	- `POST /api/posts` — Create post
		- Body (JSON): `{ "title": "...", "content": "...", "category": "<categoryId>", "image": "<url>" }`
	- `PUT /api/posts/:id` — Update post
	- `DELETE /api/posts/:id` — Delete post

- **Categories**
	- `GET /api/categories` — List categories (seeded by `seed.js`)

**Authentication & Tokens**
- Endpoints that modify data (`POST /api/documents`, `PUT`/`DELETE` on documents) are protected. Include header:

```
Authorization: Bearer <token>
```

Tokens are issued on successful login/register and expire in 7 days (see `authController.js`).

**Storage & Uploads**
- Uploaded files are stored in the `uploads/` folder and served at `/uploads/<filename>`. The `fileUrl` field in `Document` points to `${BASE_URL}/uploads/<filename>`.

**Database models — quick reference**
- `User` — `{ email, password (hashed), department }`
- `Document` — `{ title (required), description, department (required), fileUrl (required), filename, uploadedBy, createdAt }`
- `Post` — `{ title (required), content, category, image, createdAt }`
- `Category` — `{ name (required) }`

**Development notes & next steps**
- CORS is configured for `http://localhost:5173` (adjust in `server.js` for your frontend).
- Consider adding:
	- Role-based access (admin/moderator) for document deletion.
	- Pagination and search for documents and posts.
	- File type and size validation for uploads.

**Troubleshooting**
- If file URLs don't load, ensure `uploads/` exists and `BASE_URL` matches server host/port.
- Check server logs for errors — the error handler returns JSON `{ message }`.

**License & Attribution**
- This project is provided as-is for educational or internal use. Adjust licensing as needed.

---

If you'd like, I can also:
- add OpenAPI/Swagger docs,
- add Postman collection examples,
- or add simple curl snippets for PowerShell/Windows.
