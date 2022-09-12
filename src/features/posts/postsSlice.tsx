import { Reactions } from '../../interface/Reactions';
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, EntityAdapter, EntityState, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '@/app/store';
import { client } from '../../api/client';
import { compareDate } from '../../foundation/utils';

export interface Post {
  id: string,
  date?: string,
  title: string,
  content: string,
  user: string,
  reactions?: Reactions
};

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface PostState {
  status: RequestStatus,
  error: string | undefined
};

const initializer: PostState = {
  status: 'idle',
  error: undefined
}

const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>({
  sortComparer: (a, b) => compareDate(a.date, b.date)
});

const initialState = postsAdapter.getInitialState(initializer);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: {
      reducer(state, action: PayloadAction<Post>) {
        const { id, title, content, reactions } = action.payload;
        const existingPost = state.entities[id];
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
      reducer(state, action: PayloadAction<{ postId: string, reaction: keyof Reactions }>) {
        const { postId, reaction } = action.payload;
        const existingPost = state.entities[postId];
        if (existingPost && existingPost.reactions) {
          existingPost.reactions[reaction]++;
        }
      },
      prepare({ postId, reaction }: { postId: string, reaction: keyof Reactions }) {
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
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched posts to the array
        // Use the `upsertMany` reducer as a mutating update utility
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || '';
      })
  }
});

export const fetchPosts = createAsyncThunk<
  Post[],      // Returned = fulfilled の Payloadの型
  void       // AsyncThunkPayloadCreator の第1引数の型
// AsyncThunkPayloadCreatorに第2引数がある場合は記述
>('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts');
  return response.data;
});

export const addNewPost = createAsyncThunk<
  Post,
  Post
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

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => state.posts);

/**
 * reselect Selector を使用したuserIdによる投稿取得処理
 *
 * createSelector の第1引数：stateで更新に関わる要素
 *
 * createSelector の第2引数：selector関数
 *
 * 第1引数がselector関数の引数に指定できる
 */
export const selectPostsByUser = createSelector(
  [selectAllPosts, (_, userId: string) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
);
