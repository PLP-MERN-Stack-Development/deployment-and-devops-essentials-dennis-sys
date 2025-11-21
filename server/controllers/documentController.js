// controllers/documentController.js
import Document from "../models/Document.js";

export const getDocuments = async (req, res, next) => {
  try {
    const docs = await Document.find()
      .populate("uploadedBy", "email department")
      .sort({ createdAt: -1 });

    res.json(docs);
  } catch (err) {
    next(err);
  }
};

export const getDocument = async (req, res, next) => {
  try {
    const doc = await Document.findById(req.params.id)
      .populate("uploadedBy", "email department");

    res.json(doc);
  } catch (err) {
    next(err);
  }
};

export const createDocument = async (req, res, next) => {
  try {
    const { title, description, department } = req.body;

    if (!req.file)
      return res.status(400).json({ message: "File is required" });

    // Cloudinary gives file URL here:
    const fileUrl = req.file.path;

    const doc = new Document({
      title,
      description,
      department,
      fileUrl,
      filename: req.file.originalname,
      uploadedBy: req.user ? req.user._id : null
    });

    await doc.save();
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

export const updateDocument = async (req, res, next) => {
  try {
    const updated = await Document.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteDocument = async (req, res, next) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: "Document deleted" });
  } catch (err) {
    next(err);
  }
};
