import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  topic: string;
  data: string;
  created_at: string;
  updated_at: string;
}

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load post (status ${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load post");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    fetch(`http://localhost:3000/api/posts/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.status === 204) {
          navigate("/posts");
        } else {
          throw new Error(`Delete failed (status ${res.status})`);
        }
      })
      .catch((err) => {
        alert(err instanceof Error ? err.message : "Failed to delete post");
      });
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (error) return <p style={{ padding: "20px" }}>Error: {error}</p>;
  if (!post) return <p style={{ padding: "20px" }}>Post not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/posts">← Back to Posts</Link>

      <h1 style={{ marginTop: "20px" }}>{post.topic}</h1>

      <p style={{ whiteSpace: "pre-wrap", marginTop: "10px" }}>{post.data}</p>

      <div style={{ marginTop: "20px", fontSize: "0.9em", color: "#666" }}>
        <div>Created: {new Date(post.created_at).toLocaleString()}</div>
        <div>Updated: {new Date(post.updated_at).toLocaleString()}</div>
      </div>

      <div style={{ marginTop: "25px" }}>
        <Link to={`/edit/${post.id}`}>
          <button style={{ marginRight: "10px" }}>Edit</button>
        </Link>

        <button onClick={handleDelete} style={{ backgroundColor: "#d9534f", color: "white" }}>
          Delete
        </button>
      </div>
    </div>
  );
}

