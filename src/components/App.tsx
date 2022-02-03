import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import "../css/app.css";
import LoadingSpinner from "./LoadingSpinner";
import PostsGrid from "./PostsGrid";
interface IPost {
  id: number;
  userId?: number;
  title: string;
  body: string;
}
const defaultPosts: IPost[] = [
  { userId: 1, id: 1, title: "sunt ", body: "quia et suscipi" },
];

export const AppCtx = createContext([]);

function App() {
  const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] =
    useState(defaultPosts);

  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = useState("");

  useEffect(() => {
    axios
      .get<IPost[]>("https://jsonplaceholder.typicode.com/posts", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setPosts(response.data);
        setLoading(false);
      })
      .catch((ex) => {
        const error =
          ex.response.status === 404
            ? "Resource Not found"
            : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <AppCtx.Provider value={posts as any}>
      <div className="app">
        <PostsGrid />
      </div>
    </AppCtx.Provider>
  );
}

export default App;
