import { useState, useEffect, useContext } from "react";
import { useApi } from "../hooks/useApi";
import { AuthContext } from "../context/AuthContext";

const departments = [
  "Registration and Coordination",
  "HR and Administration",
  "Supply Chain Management",
  "ICT and Compliance",
  "Finance and Accounts",
  "Legal",
  "CEO's Research and Policy"
];

export default function UploadDocument({ docToEdit, onSuccess }) {
  const api = useApi();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState(user?.department || "");
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (docToEdit) {
      setTitle(docToEdit.title);
      setDescription(docToEdit.description || "");
      setDepartment(docToEdit.department);
    }
  }, [docToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !department || (!file && !docToEdit)) {
      setError("Title, department and file (for new document) are required");
      return;
    }
    setError("");

    try {
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("department", department);
      if (file) form.append("file", file);

      // set true for FormData
      await api.post("/api/documents", form, true);
      onSuccess();
      setTitle(""); setDescription(""); setDepartment(user?.department || ""); setFile(null);
    } catch (err) {
      console.error(err);
      setError("Upload failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20, border: "1px solid #ddd", marginBottom: 20, maxWidth: 900 }}>
      <h2>Upload Document</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />

      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} style={{ width: "100%", marginBottom: 8 }} />

      <select value={department} onChange={e=>setDepartment(e.target.value)} style={{ width: "100%", marginBottom: 8 }}>
        <option value="">Select Department</option>
        {departments.map(d=> <option key={d} value={d}>{d}</option>)}
      </select>

      <input type="file" onChange={e=>setFile(e.target.files[0])} style={{ marginBottom: 8 }} />

      <button type="submit">Save Document</button>
    </form>
  );
}
