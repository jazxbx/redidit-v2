import { Link } from "react-router-dom";

export default function Navbar({ user, setToken, setUser }) {
  function handleLogout() {
    setToken("");
    setUser({});
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar-container">
      <ul className="navbar-flex-items">
        <>
          <li className="bold orange">
            <Link to={"/"}>Redidit</Link>
          </li>
        </>

        {!user.id && (
          <div className="nav-buttons">
            <button>
              <Link to={"/login"}>Login</Link>
            </button>
            <button>
              <Link to={"/register"}>Register</Link>
            </button>

            <Link to={"/create/post"}>
              <button>Create Post </button>
            </Link>
          </div>
        )}
        {user.id && (
          <div className="nav-buttons">
            <span>Welcome u/{user.username}</span>
            <button onClick={handleLogout}>
              <Link to={"/"}>Logout</Link>
            </button>
            <Link to={"/create/post"}>
              <button>Create Post </button>
            </Link>
            <Link to={"/create/subreddit"}>
              <button>Create Subreddit</button>
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
}
