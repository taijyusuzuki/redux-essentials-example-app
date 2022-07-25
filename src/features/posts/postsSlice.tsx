import { initialReactions, Reactions } from '../../interface/Reactions';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'

export interface Post {
  id: string,
  date: string,
  title: string,
  content: string,
  userId: string,
  reactions: Reactions
};

const initialState: Post[] = [
  {
    id: '1',
    date: new Date('2022/07/24 12:00:00').toISOString(),
    title: 'First Post!',
    content: 'Hello!',
    userId: '0',
    reactions: initialReactions
  },
  {
    id: '2',
    date: new Date('2022/07/25 14:30:00').toISOString(),
    title: 'Second Post!',
    content: 'More text',
    userId: '0',
    reactions: initialReactions
  }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId,
            reactions: initialReactions
          }
        }
      }
    },
    postUpdated: {
      reducer(state, action: PayloadAction<Post>) {
        const { id, title, content, reactions } = action.payload;
        const existingPost = state.find(post => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
          existingPost.date = new Date().toISOString();
          existingPost.reactions = reactions;
        }
      },
      prepare(id: string, title: string, content: string, userId: string, reactions: Reactions) {
        return {
          payload: {
            id,
            date: new Date().toISOString(),
            title,
            content,
            userId,
            reactions
          }
        }
      }
    },
    reactionAdded: {
      reducer(state, action: PayloadAction<{ postId: string, reaction: keyof Reactions}>) {
        const { postId, reaction } = action.payload;
        const existingPost = state.find(post => post.id === postId);
        if (existingPost) {
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
  }
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
