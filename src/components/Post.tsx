import { FC } from "react";
import "../css/post.css";
interface PostProps {
  post: { id: number; title: string; body: string };
}

const Post: FC<PostProps> = ({ post }) => {
  const trimString = (text: string, length: number) => {
    const trimmedString =
      text.length > length ? text.substring(0, length - 3) + "..." : text;
    return trimmedString;
  };

  return (
    <div className="post">
      <h1>{post.title}</h1>
      <div>
        <p>{trimString(post.body, 100)}</p>
        <img
          src={`https://picsum.photos/660/400?random=${Math.random()}`}
          alt="blog"
        />
      </div>
    </div>
  );
};

export default Post;
