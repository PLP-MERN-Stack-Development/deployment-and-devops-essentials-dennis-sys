import React from "react";

export default function PdfModal({ fileUrl, onClose }) {
  if (!fileUrl) return null;

  // 🔥 Ensure Cloudinary forces PDF rendering inside iframe
  const viewUrl = fileUrl.includes("cloudinary")
    ? `${fileUrl}?raw=1`
    : fileUrl;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          width: "80%",
          height: "85%",
          background: "white",
          borderRadius: 8,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "red",
            color: "white",
            border: "none",
            padding: "6px 10px",
            borderRadius: 4,
            cursor: "pointer",
            zIndex: 10,
          }}
        >
          ✖ Close
        </button>

        {/* PDF VIEWER */}
        <iframe
          src={viewUrl}
          title="PDF Preview"
          style={{ width: "100%", height: "100%", border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}
