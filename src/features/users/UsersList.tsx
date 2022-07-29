import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers, Users } from './usersSlice';

export const UsersList = () => {
  const users: Users[] = useSelector(selectAllUsers);

  const renderdUsers = users.map(user => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ));

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderdUsers}</ul>
    </section>
  );
};
