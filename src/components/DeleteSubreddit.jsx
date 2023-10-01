import { FaTrashAlt } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { API } from "../api";

export default function DeleteSubreddit({ subreddit }) {
  const { token, fetchSubreddits, user } = useOutletContext();

  async function handleDeleteSubreddit() {
    const res = await fetch(`${API}/subreddits/${subreddit.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    if (!info.success) {
      return setError(info.error);
    }

    fetchSubreddits();
  }

  return (
    user.id === subreddit.userId && (
      <>
        <button className="delete-icon" onClick={handleDeleteSubreddit}>
          <FaTrashAlt /> Delete
        </button>
      </>
    )
  );
}
