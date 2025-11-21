import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then(res => res.json())
      .then(data => setPost(data));
  }, [id]);

  if (!post) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      {post.category && <p>Category: {post.category.name}</p>}
    </div>
  );
}
