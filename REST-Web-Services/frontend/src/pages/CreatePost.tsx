import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const [topic, setTopic] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

    fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: cleanTopic, data: cleanData }),
    })
      .then(async (res) => {
        if (res.ok) {
          const created = await res.json();
          navigate(`/posts/${created.id}`);
        } else {
          const errJson = await res.json().catch(() => null);
          throw new Error(errJson?.message || "Failed to create post");
        }
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to create post");
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/posts">← Back to Posts</Link>

      <h1 style={{ marginTop: "20px" }}>Create New Post</h1>

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
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {submitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
