import { AppDispatch, RootState } from "@/app/store";
import { Spinner } from "../../components/Spinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { fetchPosts, Post, selectAllPosts } from "./postsSlice";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";

const PostExcerpt = ({ post }: { post: Post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date ? post.date : 'Failed to retrive posted date'} />
      </div>
      <p className="post-content">{post.content.substring(0, 82)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
};

export const PostsList = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch]);

  let content: JSX.Element | JSX.Element[];

  switch (postStatus) {
    case 'loading':
      content = <Spinner text='Loading...' />;
      break;
    case 'succeeded':
      // Sort posts in reverse chronological order by datetime string
      const orderedPosts = posts.slice().sort(
        (a, b) => (b.date ? b.date : '0').localeCompare(a.date ? a.date : '0')
      );

      content = orderedPosts.map(post => (
        <PostExcerpt key={post.id} post={post} />
      ));
      break;
    case 'failed':
      content = <div>{error}</div>;
      break;
    default:
      content = <div></div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
