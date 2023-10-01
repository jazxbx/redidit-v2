import React, { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { API } from "../lib";

export default function CreateComment({ postId, subredditId, fetchPost }) {
  const { token, fechPosts, posts } = useOutletContext();
  // const { postId } = useParams();

  // console.log(posts);

  const [title, setTitle] = useState("child");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        text,
        subredditId,
        parentId: postId,
      }),
    });

    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    setText("");
    fetchPost();
  }
  console.log(text);
  console.log("postId:", postId);
  return (
    <div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <div>
          <p>Commenting not working atm..</p>
          <input
            className="comment-input"
            type="text"
            placeholder="Enter your comment.."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {/* cheat backend sorryy */}
          <input type="hidden" name="title" value={title} />
          <button>Submit Comment</button>
        </div>
      </form>
      {/* <p>{error}</p> */}
    </div>
  );
}
