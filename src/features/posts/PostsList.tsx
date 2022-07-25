import React from "react";
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { RootState } from "../../app/store";
import { PostAuthor } from "./PostAuthor";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";

export const PostsList = () => {
  const posts = useSelector((state: RootState) => state.posts);

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts.slice().sort(
    (a, b) => b.date.localeCompare(a.date)
  );

  const renderedPosts = orderedPosts.map(post => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 82)}</p>
      <p className="post-author">
        <PostAuthor userId={post.userId} />
      </p>
      <p className="post-time-ago">
        <TimeAgo timestamp={post.date} />
      </p>
      <p className="post-reaction-buttons">
        <ReactionButtons post={post} />
      </p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
