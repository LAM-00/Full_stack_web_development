// App shell: coordinates data fetching, post creation, and top-level layout.
// - Loads posts from the datastore API on mount.
// - Sends new posts to the API and optimistically prepends them in UI.
// - Surfaces request success/failure in a small alert above the form.
import { useEffect, useState } from "react"; // Import React hooks for effects and state.
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"; // Import router components for client-side routing.
import ClickCounter2 from "./components/ClickCounter2";
import CreatePost, { type NewPost } from "./components/CreatePost"; // Import create-post form and its payload type.
import Posts, { type PostData } from "./components/Posts"; // Import posts list component and its data type.
import "./App.css"; // Import component-level styles for layout.
import ClickCounter from "./components/ClickCounter";

function App() { // Define the main application component.
  const [posts, setPosts] = useState<PostData[]>([]); // State for the list of posts.
  const [error, setError] = useState<string | null>(null); // State for fetch error messages.
  const [loading, setLoading] = useState(true); // State for initial loading flag.
  const [alert, setAlert] = useState<string | null>(null); // State for transient success/error alerts.
  const [clicks, setClicks] = useState(0); // State for click counter on the landing page.

  const loadPosts = () => {
    return fetch("http://localhost:8080/api/posts") // Call the datastore API.
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data as PostData[]);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load posts");
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Initial fetch for the existing posts list.
  useEffect(() => { // Run this effect after the component mounts.
    loadPosts();
  }, []); // Empty dependency array means run once after first render.

  // Sends a new post to the datastore API and updates local state.
  const handleCreate = (post: NewPost) => { // Define a handler that receives a new post payload.
    return fetch("http://localhost:8080/api/posts", { // Send POST request to datastore.
      method: "POST", // Use HTTP POST to create a post.
      headers: {
        "Content-Type": "application/json", // Tell the server we are sending JSON.
      },
      body: JSON.stringify({ topic: post.text, data: post.text }), // Serialize the post payload.
    })
      .then((response) => { // Inspect the HTTP response.
        if (!response.ok) { // Check for HTTP errors.
          throw new Error(`Request failed: ${response.status}`); // Throw to jump to catch.
        }
        return response.json(); // Parse JSON on success.
      })
      .then((created) => { // Handle the created post response.
        setPosts((current) => [created as PostData, ...current]); // Prepend the new post in local state.
        setAlert("Post sent to datastore server."); // Show a success message.
        setTimeout(() => setAlert(null), 3000); // Clear the alert after 3 seconds.
      })
      .catch((err) => { // Handle network or server errors.
        const message = err instanceof Error ? err.message : "Failed to send post."; // Normalize error message.
        setAlert(message); // Show an error message in the alert area.
        setTimeout(() => setAlert(null), 3000); // Clear the alert after 3 seconds.
        throw err; // Re-throw so CreatePost can show its inline error.
      });
  };

  const landing = ( // Define the landing page UI.
    <main className="app"> {/* Root layout container. */}
      <div className="app__content"> {/* Two-column layout wrapper. */}
        <section className="card app__landing"> {/* Simple landing panel. */}
          <h1>Poststore</h1>
          <p className="app__tagline">
            A wonderful website to save, browse, and share your very own timestamped posts with you and yourself
          </p>
          <p>Choose what you want to do next.</p>
          <div className="app__actions">
            <Link className="app__link" to="/posts">
              <button type="button" className="app__button app__button--primary">
                View all posts
              </button>
            </Link>
            <Link className="app__link" to="/create">
              <button type="button" className="app__button app__button--ghost">
                Create a new post
              </button>
            </Link>
            <div>
            <ClickCounter></ClickCounter>
            <ClickCounter/>
           </div>
           <div>
            <ClickCounter2
              count={clicks}
              onIncrement={() => setClicks((value) => value + 1)}
            />
            <ClickCounter2
              count={clicks}
              onIncrement={() => setClicks((value) => value + 1)}
            />
            </div>
          </div>
        </section>
      </div>
    </main>
  );

  const postsPage = ( // Define the main posts page UI.
    <main className="app"> {/* Root layout container. */}
      <div className="app__content app__content--wide app__content--stack"> {/* Stacked layout wrapper. */}
        <div className="app__toolbar">
          <Link className="app__back" to="/">
            ← Back
          </Link>
          <button
            type="button"
            className="app__refresh"
            onClick={() => {
              setLoading(true);
              loadPosts().catch(() => {});
            }}
          >
            Refresh
          </button>
        </div>
        <Posts posts={posts} error={error} loading={loading} /> {/* Posts list component. */}
      </div>
    </main>
  );

  const createPage = ( // Define the create-only page UI.
    <main className="app"> {/* Root layout container. */}
      <div className="app__content app__content--narrow"> {/* Two-column layout wrapper. */}
        <Link className="app__back" to="/">
          ← Back
        </Link>
        <div className="app__form"> {/* Form column wrapper for alert + create form. */}
          {alert ? <p className="app__alert">{alert}</p> : null} {/* Conditional alert message. */}
          <CreatePost onCreate={handleCreate} /> {/* Create-post form component. */}
        </div>
      </div>
    </main>
  );

  return ( // Render the UI.
    <BrowserRouter> {/* Router wrapper for client-side navigation. */}
      <Routes> {/* Route definitions. */}
        <Route path="/" element={landing} /> {/* Landing page with navigation choices. */}
        <Route path="/posts" element={postsPage} /> {/* Posts page shows list + create. */}
        <Route path="/create" element={createPage} /> {/* Create page shows form only. */}
        <Route path="*" element={landing} /> {/* Fallback route for unknown paths. */}
      </Routes>
    </BrowserRouter>
  );
}

export default App; // Export the component as the default export.
