function ChildPost({ child }) {
  return (
    <div className="child-post" key={child.id}>
      {/* Render child comment content here */}
      <p>{child.text}</p>
    </div>
  );
}
import { useOutletContext, Link, useParams } from "react-router-dom";
import Votes from "./Votes";
import { FaPencilAlt } from "react-icons/fa";
import DeletePost from "./DeletePost";
import DisplayComment from "./DisplayComment";

export default function DisplayPost({ post }) {
  const { user } = useOutletContext();
  const { postId } = useParams();

  const canEdit = user && user.id === post.userId;
  // console.log(user.userId, post.userId);
  // console.log(post);

  return (
    <>
      <div className="post-container" key={post.id}>
        <div className="grid-left">
          <Votes post={post} />
        </div>
        <div>
          <div className="post-header">
            <Link to={`/subreddit/${post.subreddit.id}`}>
              <p className="bold">r/{post.subreddit.name}</p>
            </Link>
            <p>by u/{post.user.username}</p>
          </div>
          {post.title && <h2>{post.title}</h2>}
          <div className="post-content">
            <Link to={`post/${post.id}`}>
              <p>{post.text}</p>
            </Link>
          </div>
          {canEdit && (
            <Link to={`editpost/${post.id}`}>
              <button>
                <FaPencilAlt />
              </button>
            </Link>
          )}
          <DeletePost post={post} />
        </div>
        <div>
          <div>
            {/* recursive fn to show children of children */}
            {post.children &&
              post.children.map((childPost) => {
                return (
                  <DisplayComment
                    key={childPost.id}
                    text={childPost.text}
                    username={childPost.user.username}
                    children={childPost.children}
                    post={childPost.post}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {/* {post.children &&
        post.children.map((child) => {
          return <DisplayPost post={child} />;
        })} */}
    </>
  );
}
