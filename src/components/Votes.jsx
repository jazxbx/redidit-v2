import { Link, useOutletContext } from "react-router-dom";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { API } from "../lib";
import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Votes({ post }) {
  const { token, fetchPosts } = useOutletContext();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  async function handleUpVote() {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const res = await fetch(`${API}/votes/upvotes/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
    if (!info.success) {
      deleteUpVote();
    }
  }

  async function handleDownVote() {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const res = await fetch(`${API}/votes/downvotes/${post.id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
    if (!info.success) {
      deleteDownVote();
    }
  }

  async function deleteUpVote() {
    const res = await fetch(`${API}/votes/upvotes/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
  }

  async function deleteDownVote() {
    const res = await fetch(`${API}/votes/downvotes/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    fetchPosts();
    const info = await res.json();
  }

  return (
    <>
      <button
        onClick={() => {
          handleUpVote();
          deleteDownVote();
        }}
      >
        <FaArrowUp />
      </button>
      {post.upvotes.length - post.downvotes.length}
      <button
        onClick={() => {
          handleDownVote();
          deleteUpVote();
        }}
      >
        <FaArrowDown />
      </button>
      <Modal
        title="Please Log In"
        open={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
        onOk={() => {
          setShowLoginModal(false);
          navigate("/login");
        }}
      >
        <p>Please log in to vote on this post.</p>
      </Modal>
    </>
  );
}
