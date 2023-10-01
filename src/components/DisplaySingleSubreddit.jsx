import { Link, useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export default function DisplaySingleSubreddit() {
  const { subreddits, posts } = useOutletContext();
  const { subredditId } = useParams();

  const findSubreddit = subreddits.find(
    (subreddit) => subreddit.id === subredditId
  );

  const filteredPosts = posts.filter(
    (post) => post.subredditId === findSubreddit.id
  );

  return (
    <div className="center">
      <div>
        {filteredPosts.length === 0 ? (
          <div>
            <h1>Subreddit empty, create a post!</h1>
            <Link to={"/create/post"}>
              <button className="create-subreddit">Post</button>
            </Link>
          </div>
        ) : (
          <div className="subreddit-container">
            <div>
              <h1>r/{findSubreddit.name}</h1>
              {filteredPosts.map((post) => (
                <div key={post.id}>
                  <div className="subreddit-post-container">
                    <h1 className="text-l">{post.title}</h1>
                    <p className="text-s">Posted by u/{post.user.username}</p>
                    <p className="text-m content">{post.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
