import { RootState } from '@/app/store';
import { initialPostContents } from '../../interface/PostContents';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { postUpdated, selectPostById } from './postsSlice';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { isPost } from '../../foundation/utils';
import { initialReactions } from '../../interface/Reactions';

export const EditPostForm = () => {
  const postId = useParams().postId;

  if (postId === undefined) {
    throw new Error(
      `Expected 'postId' to be defined, but received ${postId}`
    )
  };

  const post = useSelector((state: RootState) =>
    selectPostById(state, postId)
  );

  if (!isPost(post)) {
    throw new Error(
      `Expected 'post' to be defined, but received ${post}`
    )
  };

  const [postContents, setPostContents] = useState(initialPostContents);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePostForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    setPostContents({...postContents, [name]: e.target.value});
  };

  const handleClickSavePost = () => {
    dispatch(
      postUpdated(
        postId || '',
        postContents.title || post.title,
        postContents.content || post.content,
        postContents.userId || post.user,
        post.reactions || initialReactions
      )
    );
    navigate(`/posts/${postId}`, { replace: true });
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="title"
          placeholder="What's on your mind?"
          value={postContents.title}
          onChange={handleChangePostForm}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="content"
          value={postContents.content}
          onChange={handleChangePostForm}
        />
      </form>
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        disabled={!postContents.title && !postContents.content}
        onClick={handleClickSavePost}
      >
        Save Post
      </Button>
    </section>
  )
};
