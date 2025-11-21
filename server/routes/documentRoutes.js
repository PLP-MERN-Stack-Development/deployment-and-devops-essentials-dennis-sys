// routes/documentRoutes.js
import express from "express";
import {
  getDocuments,
  getDocument,
  createDocument,
  updateDocument,
  deleteDocument
} from "../controllers/documentController.js";

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Correct Cloudinary RAW storage for PDFs
const storage = new CloudinaryStorage({
  cloudinary,
  params: () => ({
  folder: "cdms-documents",
  resource_type: "auto",      // changed to auto
  format: "pdf",
  type: "upload",
}),

});

const upload = multer({ storage });

// ---------------- ROUTES ----------------

// GET all documents
router.get("/", getDocuments);

// GET one document
router.get("/:id", getDocument);

// CREATE document with file upload
router.post("/", upload.single("file"), createDocument);

// UPDATE (no file update)
router.put("/:id", updateDocument);

// DELETE
router.delete("/:id", deleteDocument);

export default router;


