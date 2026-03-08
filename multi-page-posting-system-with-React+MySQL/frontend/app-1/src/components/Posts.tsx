// Posts list + header layout.
// - Renders header, empty/error/loading states, and the list of Post cards.
// - Expects posts data pre-fetched by the parent.
import Post from "./Post";
import "./Posts.css";

export type PostData = {
  text: string;
  data: string;
  timestamp: string;
};

type PostsProps = {
  posts: PostData[];
  error: string | null;
  loading: boolean;
};

function Posts({ posts, error, loading }: PostsProps) {
  return (
    <section className="posts">
      <header className="posts__header">
        <div>
          <p className="posts__kicker">Datastore feed</p>
          <h1>Latest posts</h1>
        </div>
        <span className="posts__count">{posts.length} total</span>
      </header>

      {/* Conditional status messages. */}
      {loading ? <p className="posts__state">Loading posts...</p> : null}
      {error ? <p className="posts__state posts__state--error">{error}</p> : null}
      {!loading && !error && posts.length === 0 ? (
        <p className="posts__state">No posts yet. Add one to get started.</p>
      ) : null}

      {/* Scrollable list of post cards. */}
      <div className="posts__list">
        {posts.map((post, index) => (
          <Post
            key={`${post.timestamp}-${index}`}
            text={post.data}
            timestamp={post.timestamp}
          />
        ))}
      </div>
    </section>
  );
}

export default Posts;
