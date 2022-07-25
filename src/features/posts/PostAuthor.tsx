import { RootState } from '@/app/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { Users } from '../users/usersSlice';

export const PostAuthor = ({ userId }: {userId: string}) => {
  const author: Users | undefined = useSelector((state: RootState) =>
    state.users.find(user => user.id === userId)
  );

  return (
    <span>
      by {author ? author.name : 'Unknown author'}
    </span>
  )
};
