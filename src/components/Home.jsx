import { useOutletContext, Link } from "react-router-dom";
import DisplayPost from "./DisplayPost";

export default function Home() {
  const { subreddits, posts } = useOutletContext();

  return (
    <div className="home-container">
      <div>
        {posts.map((post) => {
          if (!post.parentId) {
            return <DisplayPost key={post.id} post={post} />;
          }
        })}
      </div>
    </div>
  );
}
