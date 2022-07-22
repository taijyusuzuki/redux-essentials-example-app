import { nanoid } from '@reduxjs/toolkit';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const initialPostContents = {
  title: '',
  content: '',
};

export const AddPostForm = () => {
  const [postContents, setPostContents] = useState(initialPostContents);

  const dispatch = useDispatch();

  const handleChangePostForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    setPostContents({...postContents, [name]: e.target.value});
  };

  const handleClickSavePost = () => {
    dispatch(
      postAdded({
        id: nanoid(),
        title: postContents.title,
        content: postContents.content
      })
    );
    setPostContents(initialPostContents);
  };

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
          disabled={!(postContents.title && postContents.content)}
          onClick={handleClickSavePost}
        >
          Save Post
        </Button>
      </form>
    </section>
  )
};
