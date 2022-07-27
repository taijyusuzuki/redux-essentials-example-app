import { initialReactions, Reactions } from '../../interface/Reactions';
import { createAsyncThunk, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store';
import { client } from '../../api/client';

export interface Post {
  id?: string,
  date?: string,
  title: string,
  content: string,
  user: string,
  reactions?: Reactions
};

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface PostData {
  posts: Post[],
  status: RequestStatus,
  error: string | undefined
}

const initialState: PostData = {
  posts: [],
  status: 'idle',
  error: undefined
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: {
      reducer(state, action: PayloadAction<Post>) {
        const { id, title, content, reactions } = action.payload;
        const existingPost = state.posts.find(post => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
          existingPost.date = new Date().toISOString();
          existingPost.reactions = reactions;
        }
      },
      prepare(id: string, title: string, content: string, user: string, reactions: Reactions) {
        return {
          payload: {
            id,
            date: new Date().toISOString(),
            title,
            content,
            user,
            reactions
          }
        }
      }
    },
    reactionAdded: {
      reducer(state, action: PayloadAction<{ postId: string | undefined, reaction: keyof Reactions}>) {
        const { postId, reaction } = action.payload;
        const existingPost = state.posts.find(post => post.id === postId);
        if (existingPost && existingPost.reactions) {
          existingPost.reactions[reaction]++;
        }
      },
      prepare({ postId, reaction }: { postId: string | undefined, reaction: keyof Reactions }) {
        return {
          payload: {
            postId,
            reaction
          }
        }
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post>) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
    builder
      .addCase(addNewPost.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.posts.push(action.payload)
      })
  }
});

export const fetchPosts = createAsyncThunk<
  Post,      // Returned = fulfilled の Payload
  undefined, // AsyncThunkPayloadCreator の第1引数の型
  {}         // AsyncThunkConfig<T> の T = rejected の Payload
>('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

export const addNewPost = createAsyncThunk<
  Post,
  Post,
  {}
>(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async initialPost => {
    // We send the initial data to the fake API server
    const response = await client.post('/fakeApi/posts', initialPost);
    // The response includes the complete post object, including unique ID
    return response.data;
  }
)

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) => state.posts.posts.find(post => post.id === postId);
