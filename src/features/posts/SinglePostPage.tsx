import { RootState } from '@/app/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Post } from './postsSlice';

export const SinglePostPage = () => {
  const postId = useParams().postId;

  const post: Post | undefined = useSelector((state: RootState) => {
    return state.posts.find(post => post.id === postId);
  });

  return (
    <section>
      <article className="post">
        <h2>{post?.title}</h2>
        <p className="post-content">{post?.content}</p>
        <Link to={`/editPost/${postId}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  );
};
