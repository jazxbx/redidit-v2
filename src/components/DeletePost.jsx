import { FaTrashAlt } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { API } from "../lib";
import { Modal } from "antd";
import { useState } from "react";

export default function DeletePost({ post }) {
  const { token, fetchPosts, user } = useOutletContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  async function handleDeletePost() {
    const res = await fetch(`${API}/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await res.json();

    console.log(info);

    fetchPosts();
  }

  return (
    user.id === post.userId && (
      <>
        <button onClick={showModal}>
          <FaTrashAlt />
        </button>
        <Modal
          title="Confirm Delete"
          open={isModalVisible}
          onOk={handleDeletePost}
          onCancel={() => setIsModalVisible(false)}
        >
          <p>Are you sure you want to delete this post?</p>
        </Modal>
      </>
    )
  );
}
