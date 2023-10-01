import { useState } from "react";

import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { API } from "../lib";

export default function CreateSubreddit() {
  const { token, fetchSubreddits } = useOutletContext();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    setError("");
    e.preventDefault();

    if (!token) {
      setError(`Please login to create subreddit`);
      return;
    }

    const res = await fetch(`${API}/subreddits`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    } else {
      setName("");
      fetchSubreddits();
      setError("");
    }

    navigate("/"); // navigate to newly createdsubreddit page
  }

  return !token ? (
    <p>Please log in to create community</p>
  ) : (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Create Subreddit"
          />
        </div>
        <button>
          <Link to={"/"}>Cancel</Link>
        </button>
        <button>Create Community</button>
        {error && <p className="">{error}</p>}
      </form>
    </div>
  );
}
