// Single post presentation component.
// - Displays a post body and its timestamp.
// - Formats the timestamp for readability on the client.
import "./Post.css";

type PostProps = {
  text: string;
  timestamp: string;
};

function Post({ text, timestamp }: PostProps) {
  // Convert the stored timestamp to a local-friendly string.
  const formatted = new Date(timestamp).toLocaleString();

  return (
    <article className="post">
      <p className="post__text">{text}</p>
      <div className="post__meta">{formatted}</div>
    </article>
  );
}

export default Post;
