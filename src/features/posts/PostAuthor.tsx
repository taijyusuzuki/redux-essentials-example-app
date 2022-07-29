import { RootState } from '@/app/store';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectUserById, Users } from '../users/usersSlice';

export const PostAuthor = ({ userId }: {userId: string}) => {
  const author: Users | undefined = useSelector((state: RootState) => selectUserById(state, userId));

  return (
    <span>
      by {author ? author.name : 'Unknown author'}
    </span>
  )
};
