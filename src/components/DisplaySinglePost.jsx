import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../lib";
import CreateComment from "./CreateComment";
import DisplayComment from "./DisplayComment";

export default function DisplaySinglePost() {
  const { postId } = useParams();

  const [post, setPost] = useState();
  const [isReplying, setIsReplying] = useState(false);

  async function fetchPost() {
    const res = await fetch(`${API}/posts/${postId}`);
    const info = await res.json();
    // console.log(info.post);
    if (info.success) {
      setPost(info.post);
    }
  }

  // console.log(post.comments);
  useEffect(() => {
    // console.log(postId);
    // console.log(`${API}/posts/${postId}`);
    fetchPost();
  }, []);

  //   useEffect(() => {
  //     console.log(post);
  //   }, [post]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <div className="post-container">
        <div></div>
        <div className="post-content">
          <div className="post-header">r/{post.subreddit.name}</div>
          <h1>{post.title}</h1>
          <p>u/{post.user.username}</p>
          <div>{post.text}</div>
        </div>
        <CreateComment
          postId={postId}
          subredditId={post.subreddit.id}
          fetchPost={fetchPost}
        />
      </div>
      <div>
        {post.children &&
          post.children.map((child) => (
            <DisplayComment
              key={child.id}
              text={child.text}
              username={child.user.username}
              children={child.children}
            />
          ))}
      </div>
    </>
  );
}
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { API } from "../lib";
// import CreateComment from "./CreateComment";
// import DisplayComment from "./DisplayComment";
// import DisplaySinglePostChild from "./DisplaySinglePostChild";

// export default function DisplaySinglePost() {
//   const { postId } = useParams();

//   const [post, setPost] = useState();

//   async function fetchPost() {
//     const res = await fetch(`${API}/posts/${postId}`);
//     const info = await res.json();
//     if (info.success) {
//       setPost(info.post);
//     }
//   }

//   useEffect(() => {
//     fetchPost();
//   }, []);

//   if (!post) return <p>Loading...</p>;

//   console.log(post);
//   console.log("children", post.children);

//   return (
//     <>
//       <div className="post-container">
//         <div></div>
//         <div className="post-content">
//           <div className="post-header">r/{post.subreddit.name}</div>
//           <h1>{post.title}</h1>
//           <p>u/{post.user.username}</p>
//           <div>{post.text}</div>
//         </div>
//         <CreateComment
//           postId={postId}
//           subredditId={post.subreddit.id}
//           fetchChildren={fetchPost}
//         />
//       </div>
//       <div className="comments">
//         {post.children &&
//           post.children.map((comment) => (
//             <DisplaySinglePostChild
//               key={comment.id}
//               text={comment.text}
//               // username={comment.user.username}
//               // children={comment.children}
//               post={comment.post}
//             />
//           ))}
//       </div>
//     </>
//   );
// }
