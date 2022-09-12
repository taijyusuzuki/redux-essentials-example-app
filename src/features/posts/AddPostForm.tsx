import React, { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { initialPostContents } from '../../interface/PostContents';
import { selectAllUsers } from '../users/usersSlice';
import { useAddNewPostMutation } from '../api/apiSlice';

export const AddPostForm = () => {
  const [postContents, setPostContents] = useState(initialPostContents);

  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const users = useSelector(selectAllUsers);

  const handleChangePostForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = e.target.name;
    setPostContents({ ...postContents, [name]: e.target.value });
  };

  const handleClickSavePost = async () => {
    if (canSave) {
      try {
        await addNewPost({
          title: postContents.title,
          content: postContents.content,
          user: postContents.userId,
        }).unwrap();
        setPostContents(initialPostContents);
      } catch (err) {
        console.error('Failed to save the post: ', err);
      }
    }
  };

  const shouldValiableItems = [
    postContents.title,
    postContents.content,
    postContents.userId,
  ];
  const canSave = shouldValiableItems.every(Boolean) && !isLoading;

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
