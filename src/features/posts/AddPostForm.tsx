import { nanoid } from '@reduxjs/toolkit';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';

export const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTitle(e.target.value);
  const handleChangeContent = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setContent(e.target.value);

  const handleClickSavePost = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content
        })
      );
      setTitle('');
      setContent('');
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={handleChangeTitle}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={handleChangeContent}
        />
        <button type="button" onClick={handleClickSavePost}>Save Post</button>
      </form>
    </section>
  )
};
