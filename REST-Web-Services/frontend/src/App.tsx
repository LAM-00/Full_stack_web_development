import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PostsList from "./pages/PostsList";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "15px" }}>Home</Link>
        <Link to="/posts" style={{ marginRight: "15px" }}>Posts</Link>
        <Link to="/create">Create Post</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}

function Landing() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Posts App</h1>
      <p>This app lets you create, browse, edit, and delete posts.</p>
      <Link to="/posts">View Posts</Link>
    </div>
  );
}
