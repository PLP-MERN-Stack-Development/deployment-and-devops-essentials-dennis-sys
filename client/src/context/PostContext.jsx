import { createContext, useState, useEffect } from "react";
import { useApi } from "../hooks/useApi";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const api = useApi();
  const [posts, setPosts] = useState([]); // now it's documents

  const fetchPosts = async () => {
    try {
      const data = await api.get("/api/documents");
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch documents", err);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  return (
    <PostContext.Provider value={{ posts, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};

