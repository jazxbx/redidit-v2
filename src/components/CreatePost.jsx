import { useState } from "react";
import { API } from "../lib";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function CreatePost() {
  const { token, fetchPosts, fetchSubreddits, subreddits } = useOutletContext();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [selectSubredditId, setSelectSubredditId] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();

    if (!token) {
      setError(`Please login to post`);
      return;
    }

    if (!selectSubredditId) {
      setError("Please choose a category");
      return;
    }
    const res = await fetch(`${API}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
        subredditId: selectSubredditId,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    } else {
      setText("");
      setTitle("");
      fetchPosts();
    }
    // fetchSubreddits();
    setError("");
    navigate(`/subreddit/${selectSubredditId}`);
  }
  return (
    <div>
      <form className="post-form" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="">Select Subreddit:</label>
          <select
            id=""
            className=""
            onChange={(e) => setSelectSubredditId(e.target.value)}
            value={selectSubredditId}
          >
            <option disabled value="">
              Choose a community
            </option>
            {subreddits.map((subreddit) => (
              <option key={subreddit.id} value={subreddit.id}>
                {subreddit.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            className=""
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />
        </div>
        <div className="">
          <textarea
            className=""
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Text"
          />
        </div>
        <div className="">
          <button className="">Post</button>
        </div>

        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
}
