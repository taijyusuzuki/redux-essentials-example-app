import { Reactions } from '@/interface/Reactions';
import React from 'react'
import { useDispatch } from 'react-redux';
import { Post, reactionAdded } from './postsSlice';

const reactionEmoji = {
  thumsUp: '👍',
  heart: '❤',
  eyes: '👀',
  retweet: '🔁',
  bad: '👎'
};

export const ReactionButtons = ({ post } : { post: Post }) => {
  const dispatch = useDispatch();

  const handleClickReactionButton = (name: keyof Reactions) => dispatch(reactionAdded({ postId: post.id, reaction: name}))

  const reactionButtons = Object.entries(reactionEmoji).map(
    ([name, emoji]) => {
      const key = name as keyof Reactions;
      return (
        <button
          key={name}
          type="button"
          className="muted-button reaction-button"
          onClick={() => handleClickReactionButton(key)}
        >
          {emoji} {post.reactions[key]}
        </button>
      )
    }
  )
  return (
    <div>
      {reactionButtons}
    </div>
  )
};
