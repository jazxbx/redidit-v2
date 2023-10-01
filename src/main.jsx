import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";

import CreatePost from "./components/CreatePost.jsx";
import CreateSubreddit from "./components/CreateSubreddit.jsx";
import DisplaySingleSubreddit from "./components/DisplaySingleSubreddit.jsx";
import EditPost from "./components/EditPost.jsx";
import DisplaySinglePost from "./components/DisplaySinglePost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "create/post", element: <CreatePost /> },
      { path: "post/:postId", element: <DisplaySinglePost /> },
      { path: "create/subreddit", element: <CreateSubreddit /> },
      { path: "editpost/:postId", element: <EditPost /> },

      { path: "subreddit/:subredditId", element: <DisplaySingleSubreddit /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
