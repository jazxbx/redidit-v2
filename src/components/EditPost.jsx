import { useEffect, useState } from "react";
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { API } from "../lib";

export default function EditPost() {
  const { token, fetchPosts, posts, user } = useOutletContext();
  const { postId } = useParams();

  const post = posts.find((_post) => _post.id === postId);

  const isCurrentUserPost = user.id === post.userId;

  console.log(post);

  const [title, setTitle] = useState(post ? post.title : "");
  const [text, setText] = useState(post ? post.text : "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!post) {
      setIsLoading(true);
      fetch(`${API}/posts/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setTitle(data.post.title);
            setText(data.post.text);
          } else {
            setError(data.error);
          }
        })
        .catch((error) => {
          setError("An error occurred while fetching data.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [post, postId, token]);

  async function handleEditPost(e) {
    setError("");
    e.preventDefault();
    const res = await fetch(`${API}/posts/${postId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        text,
      }),
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    fetchPosts();
    navigate("/");
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : // Conditional render
      isCurrentUserPost ? (
        <form className="post-form" onSubmit={handleEditPost}>
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
            <button>Update Post</button>
          </div>

          {error && <p className="">{error}</p>}
        </form>
      ) : (
        <p>You do not have permission to edit this post.</p>
      )}
    </div>
  );
}
