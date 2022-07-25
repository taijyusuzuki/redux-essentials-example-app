import { RootState } from '@/app/store';
import { initialPostContents } from '../../interface/PostContents';
import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { postUpdated } from './postsSlice';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export const EditPostForm = () => {
  const postId = useParams().postId;

  const post = useSelector((state: RootState) =>
    state.posts.find(post => post.id === postId)
  );

  const [postContents, setPostContents] = useState(initialPostContents);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePostForm = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    setPostContents({...postContents, [name]: e.target.value});
  };

  const handleClickSavePost = () => {
    dispatch(postUpdated({
      id: postId,
      title: postContents.title || post?.title,
      content: postContents.content || post?.content
    }));
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
