import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
  id: number;
  topic: string;
  data: string;
  created_at: string;
  updated_at: string;
}

interface Meta {
  limit: number;
  offset: number;
  count: number;
  total: number;
  sort: string;
  q: string;
}

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [offset, setOffset] = useState(0);

  const limit = 10; 

  useEffect(() => {
    setLoading(true);

    const params = new URLSearchParams({
      limit: String(limit),
      offset: String(offset),
      q,
      sort: "created_desc",
    });

    fetch(`http://localhost:3000/api/posts?` + params.toString())
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
        setMeta(data.meta);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [offset, q]);

  const nextPage = () => {
    if (meta && offset + limit < meta.total) {
      setOffset(offset + limit);
    }
  };

  const prevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Posts</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search posts..."
          value={q}
          onChange={(e) => {
            setOffset(0);
            setQ(e.target.value);
          }}
          style={{ padding: "6px", width: "250px" }}
        />

        <Link to="/create" style={{ marginLeft: "20px" }}>
          <button>Create New Post</button>
        </Link>
      </div>

      {loading && <p>Loading...</p>}

      {!loading && posts.length === 0 && <p>No posts found.</p>}

      <ul>
        {posts.map((p) => (
          <li key={p.id} style={{ marginBottom: "15px" }}>
            <Link to={`/posts/${p.id}`}>
              <strong>{p.topic}</strong>
            </Link>

            <div style={{ fontSize: "0.8em", color: "#666" }}>
              {new Date(p.created_at).toLocaleString()}
            </div>

            <Link to={`/edit/${p.id}`} style={{ fontSize: "0.8em" }}>
              Edit
            </Link>
          </li>
        ))}
      </ul>

      {meta && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={prevPage} disabled={offset === 0}>
            Previous
          </button>

          <span style={{ margin: "0 10px" }}>
            Showing {meta.offset + 1}–{meta.offset + meta.count} of {meta.total}
          </span>

          <button onClick={nextPage} disabled={offset + limit >= meta.total}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}

