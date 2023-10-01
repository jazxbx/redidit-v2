import { useState } from "react";

export default function CommentReply({ parentComment, onSubmit }) {
  const [replyPost, setReplyPost] = useState("");
  const [isReplying, setIsReplying] = useState(true);

  const handleSubmit = (e) => {
    console.log("submit reply");
    e.preventDefault();

    onSubmit(replyPost, parentComment);

    setReplyPost("");
    setIsReplying(false);
  };

  const handleCancel = () => {
    setIsReplying(false);
    console.log("reply cancel");
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <textarea
          value={replyPost}
          onChange={(e) => setReplyPost(e.target.value)}
          placeholder="Write your reply..."
        />
        <button>Submit</button>
        <button onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}
