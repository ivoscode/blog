import { FC, useContext, useState } from "react";
import "../css/posts-grid.css";
import { AppCtx } from "./App";
import Post from "./Post";

const PostsGrid: FC = () => {
  const appContext = useContext(AppCtx);
  const [query, setQuery] = useState<string>("");

  return (
    <div className="posts-grid">
      <div className="posts-grid__search-bar">
        <input
          type="text"
          name="search"
          placeholder="Search for a blog..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
            setQuery(e.target.value)
          }
        />
      </div>

      <div className="posts-grid__grid">
        {appContext
          .filter((post: { title: string; body: string }) => {
            if (query === "") {
              return post;
            } else if (
              post.title.toLowerCase().includes(query.toLowerCase()) ||
              post.body.toLowerCase().includes(query.toLowerCase())
            ) {
              return post;
            }
            return false;
          })
          .map((post) => {
            const { id } = post;
            return <Post post={post} key={id} />;
          })}
      </div>
    </div>
  );
};
export default PostsGrid;
