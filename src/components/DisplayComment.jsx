import { useState } from "react";
import CommentReply from "./CommentReply";
import Votes from "./Votes";

export default function DisplayComment({
  text,
  username,
  children,
  post,
  downvotes,
  upvotes,
}) {
  // const [isReplying, setIsReplying] = useState(false);

  // const handleReplySubmit = (replyText) => {
  //   console.log("reply submitted", replyText);
  //   setIsReplying(false);
  // };

  return (
    <div className="comment-container">
      <div className="comment-user">u/{username}</div>
      <div>{text}</div>
      {/* <button onClick={() => setIsReplying(true)}>reply</button>
      {isReplying && (
        <CommentReply
          parentComment={{ text, username }}
          onSubmit={handleReplySubmit}
        />
      )} */}
      {/* <Votes upvotes={upvotes} downvotes={downvotes} /> */}
      <div>
        {children &&
          children.map((childComment) => (
            <DisplayComment
              key={childComment.id}
              text={childComment.text}
              username={childComment.user.username}
              children={childComment.children} // Recurse with the children of this comment
            />
          ))}
      </div>
    </div>
  );
}
