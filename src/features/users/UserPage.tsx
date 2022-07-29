import { RootState } from '@/app/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { selectPostsByUser } from '../posts/postsSlice';
import { selectUserById } from './usersSlice';

export const UserPage = () => {
  const userId = useParams().userId || '';

  const user = useSelector((state: RootState) => selectUserById(state, userId));

  const postsForUser = useSelector((state: RootState) => selectPostsByUser(state, userId));

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <section>
      <h2>{user?.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  );
};
