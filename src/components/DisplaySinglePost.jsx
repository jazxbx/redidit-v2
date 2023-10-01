import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../lib";

export default function DisplaySinglePost() {
  const { postId } = useParams();

  const [post, setPost] = useState();

  async function fetchPost() {
    const res = await fetch(`${API}/posts/${postId}`);
    const info = await res.json();
    // console.log(info.post);
    if (info.success) {
      setPost(info.post);
    }
  }

  useEffect(() => {
    // console.log(postId);
    // console.log(`${API}/posts/${postId}`);
    fetchPost();
  }, []);

  //   useEffect(() => {
  //     console.log(post);
  //   }, [post]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="post-container">
      <div>
        <p>🤮</p>
      </div>
      <div className="post-content">
        <div className="post-header">r/{post.subreddit.name}</div>
        <div>{post.title}</div>
        <p>u/{post.user.username}</p>
        <div>{post.text}</div>
      </div>
    </div>
  );
}
