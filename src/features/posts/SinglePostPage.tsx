import { isPost } from '../../foundation/utils';
import React from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { useGetPostQuery } from '../api/apiSlice';
import { Spinner } from '../../components/Spinner';

export const SinglePostPage = () => {
  const postId = useParams().postId || '';

  const {
    data: post,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetPostQuery(postId);

  let content: JSX.Element | JSX.Element[] = <></>;

  if (isFetching || !isPost(post)) {
    content = <Spinner text='Loading...' />;
  } else if (isSuccess) {
    content = (
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <p className="post-author">
          <PostAuthor userId={post.user} />
        </p>
        <p className="post-time-ago">
          <TimeAgo timestamp={post.date ? post.date : 'Failed to retrive posted date'} />
        </p>
        <p className="post-reaction-buttons">
          <ReactionButtons post={post} />
        </p>
        <Link to={`/editPost/${postId}`} className="button">
          Edit Post
        </Link>
      </article>
    )
  } else if (isError) {
    content = <div>{error?.toString()}</div>;
  }

  return (
    <section>{content}</section>
  );
};
