import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postAdded } from './postsSlice';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { initialPostContents } from '../../interface/PostContents';
import { RootState } from '@/app/store';
import { initialReactions } from '../../interface/Reactions';

export const AddPostForm = () => {
  const [postContents, setPostContents] = useState(initialPostContents);

  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users);

  const handleChangePostForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name;
    setPostContents({...postContents, [name]: e.target.value});
  };

  const handleClickSavePost = () => {
    dispatch(
      postAdded(postContents.title, postContents.content, postContents.userId)
    );
    setPostContents({
      title: '',
      content: '',
      userId: postContents.userId,
      reactions: initialReactions
    });
  };

  const canSave = Boolean(postContents.title) && Boolean(postContents.content) && Boolean(postContents.userId);

  const usersOptions = users.map(user => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="title"
          value={postContents.title}
          onChange={handleChangePostForm}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="userId"
          value={postContents.userId}
          onChange={handleChangePostForm}
        >
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="content"
          value={postContents.content}
          onChange={handleChangePostForm}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          disabled={!canSave}
          onClick={handleClickSavePost}
        >
          Save Post
        </Button>
      </form>
    </section>
  )
};
