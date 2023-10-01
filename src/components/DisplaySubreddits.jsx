import { Link } from "react-router-dom";

export default function DisplaySubreddits({ subreddits }) {
  return (
    <>
      <div className="display-subreddit">
        <h5>Trending Communities</h5>
        {subreddits.map((subreddit) => (
          <div key={subreddit.id}>
            <Link to={`/subreddit/${subreddit.id}`}>r/{subreddit.name}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
