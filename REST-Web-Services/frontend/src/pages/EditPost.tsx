import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

interface Post {
  id: number;
  topic: string;
  data: string;
  created_at: string;
  updated_at: string;
}

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Load existing post
  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load post (status ${res.status})`);
        }
        return res.json();
      })
      .then((post: Post) => {
        setTopic(post.topic);
        setData(post.data);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load post");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanTopic = topic.trim();
    const cleanData = data.trim();

    if (!cleanTopic || !cleanData) {
      setError("Both topic and data are required.");
      return;
    }

    setSubmitting(true);

    fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: cleanTopic, data: cleanData }),
    })
      .then(async (res) => {
        if (res.ok) {
          const updated = await res.json();
          navigate(`/posts/${updated.id}`);
        } else {
          const errJson = await res.json().catch(() => null);
          throw new Error(errJson?.message || "Failed to update post");
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to update post");
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading...</p>;
  if (error && !topic && !data)
    return <p style={{ padding: "20px" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <Link to={`/posts/${id}`}>← Back to Post</Link>

      <h1 style={{ marginTop: "20px" }}>Edit Post</h1>

      {error && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px", maxWidth: "500px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label>
            Topic:
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>
            Data:
            <textarea
              value={data}
              onChange={(e) => setData(e.target.value)}
              rows={6}
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

