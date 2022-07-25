import { RootState } from '@/app/store';
import { isPost } from '../../foundation/utils';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from './postsSlice';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';

export const SinglePostPage = () => {
  const postId = useParams().postId;

  const post: Post | undefined = useSelector((state: RootState) =>
    state.posts.find(post => post.id === postId)
  );

  if (!isPost(post)) {
    throw new Error(
      `Expected 'post' to be defined, but received ${post}`
    )
  };

  return (
    <section>
      <article className="post">
        <h2>{post?.title}</h2>
        <p className="post-content">{post.content}</p>
        <p className="post-author">
          <PostAuthor userId={post.userId} />
        </p>
        <p className="post-time-ago">
          <TimeAgo timestamp={post.date} />
        </p>
        <p className="post-reaction-buttons">
          <ReactionButtons post={post} />
        </p>
        <Link to={`/editPost/${postId}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
