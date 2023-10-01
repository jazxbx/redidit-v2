import { useState } from "react";

import { useNavigate, useOutletContext } from "react-router-dom";
import { API } from "../lib";

export default function Register() {
  /* make controlled input by creating useState for the input  */
  // we want to record what the user types in so we need to create some state to be able to do that
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useOutletContext();

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const res = await fetch(`${API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    //2. token is stored in local storage - localStorage.setItem needs a key ("token") and the token from the response its self available (info.token)
    setToken(info.token);
    localStorage.setItem("token", info.token);
    // redirect user to "/"
    navigate("/");
  }

  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button>Register</button>
      </form>
      <p>{error}</p>
    </div>
  );
}
