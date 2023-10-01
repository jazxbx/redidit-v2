import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { API } from "./lib";
import { useEffect, useState } from "react";
import DisplaySubreddits from "./components/DisplaySubreddits";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [subreddits, setSubreddits] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  async function fetchUser() {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      setToken(localToken);
    }

    if (!token) {
      return;
    }

    const res = await fetch(`${API}/users/token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    if (info.success) {
      setUser(info.user);
    }
  }

  async function fetchSubreddits() {
    const res = await fetch(`${API}/subreddits`);

    const info = await res.json();

    if (info.success) {
      setSubreddits(info.subreddits);
    }
  }

  async function fetchPosts() {
    const res = await fetch(`${API}/posts`);

    const info = await res.json();

    if (info.success) {
      setPosts(info.posts);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchSubreddits();
  }, [token]);

  return (
    <>
      <Navbar user={user} setToken={setToken} setUser={setUser} />
      <div className="app-container">
        <div className="main-content">
          <Outlet
            context={{
              fetchPosts,
              posts,
              setToken,
              token,
              user,
              setUser,
              subreddits,
              fetchSubreddits,
            }}
          />
        </div>
        <div className="sidebar">
          <DisplaySubreddits subreddits={subreddits} />
        </div>
      </div>
    </>
  );
}
