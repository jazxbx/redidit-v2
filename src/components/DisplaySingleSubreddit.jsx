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
    <div>
      <div>
        {filteredPosts.length === 0 ? (
          <div>
            <p>Subreddit empty, create a post!</p>
            <Link to={"/submit"}>
              <button>Post</button>
            </Link>
          </div>
        ) : (
          <div>
            <h1>r/{findSubreddit.name}</h1>
            {filteredPosts.map((post) => (
              <div key={post.id}>
                <div>
                  <p>Posted by u/{post.user.username}</p>
                  <h1>{post.title}</h1>
                  <p>{post.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
