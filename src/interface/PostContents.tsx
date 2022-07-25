import { initialReactions, Reactions } from "./Reactions";

export interface PostContents {
  title: string,
  content: string,
  userId: string,
  reactions: Reactions
};

export const initialPostContents: PostContents = {
  title: '',
  content: '',
  userId: '',
  reactions: initialReactions
};
