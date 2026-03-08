// Create-post form: collects text, stamps a timestamp, and calls the API handler.
// - Validates non-empty input.
// - Shows inline errors and disables submit while posting.
import { useState } from "react";
import "./CreatePost.css";

export type NewPost = {
  text: string;
  timestamp: string;
};

type CreatePostProps = {
  onCreate: (post: NewPost) => Promise<void>;
};

function CreatePost({ onCreate }: CreatePostProps) {
  // Local form state.
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle form submission and delegate to parent handler.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError("Please enter some text.");
      return;
    }

    setSubmitting(true);
    setError(null);

    onCreate({
      text: trimmed,
      timestamp: new Date().toISOString(),
    })
      .then(() => {
        setText("");
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to create post.");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="create-post__header">
        <h2>Create a post</h2>
        <span className="create-post__hint">Posts are saved immediately</span>
      </div>
      <textarea
        className="create-post__input"
        rows={4}
        placeholder="Share an update..."
        value={text}
        onChange={(event) => setText(event.target.value)}
        disabled={submitting}
      />
      <div className="create-post__actions">
        {error ? <span className="create-post__error">{error}</span> : null}
        <button type="submit" disabled={submitting}>
          {submitting ? "Posting..." : "Post"}
        </button>
      </div>
    </form>
  );
}

export default CreatePost;
