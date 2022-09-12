import { Spinner } from "../../components/Spinner";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { Post } from "./postsSlice";
import { ReactionButtons } from "./ReactionButtons";
import { TimeAgo } from "./TimeAgo";
import { NotFound } from "./NotFound";
import { compareDate, isPost } from "../../foundation/utils";
import { useGetPostsQuery } from "../api/apiSlice";
import classnames from "classnames";

const PostExcerpt = React.memo(({ post }: { post: Post }) => {

  if (!isPost(post)) {
    return <NotFound />;
  }

  return (
    <article className="post-excerpt" key={post?.id}>
      <h3>{post?.title}</h3>
      <div>
        <PostAuthor userId={post?.user || ''} />
        <TimeAgo timestamp={post?.date ? post.date : 'Failed to retrive posted date'} />
      </div>
      <p className="post-content">{post?.content.substring(0, 82)}</p>

      {post && <ReactionButtons post={post} />}
      <Link to={`/posts/${post?.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  );
});

export const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
    refetch,
  } = useGetPostsQuery();

  const sortedPosts = useMemo(() => {
    if (posts === undefined) {
      return posts;
    }
    const sortedPosts = posts.slice();
    // Sort posts in descending chronological order
    sortedPosts.sort((a, b) => compareDate(a.date, b.date));
    return sortedPosts;
  }, [posts]);

  let content: JSX.Element | JSX.Element[] = <></>;

  if (isLoading || sortedPosts === undefined) { // data field will be undefined until the response is received
    content = <Spinner text='Loading...' />;
  } else if (isSuccess) {
    const renderdPosts = sortedPosts.map(post => (
      <PostExcerpt key={post.id} post={post} />
    ));

    const containerClassname = classnames('posts-container', {
      disabled: isFetching
    })

    content = <div className={containerClassname}>{renderdPosts}</div>
  } else if (isError) {
    content = <div>{error?.toString()}</div>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      <button onClick={refetch}>Refetch Posts</button>
      {content}
    </section>
  );
};
