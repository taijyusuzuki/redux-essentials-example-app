import { Post } from "@/features/posts/postsSlice";

export const isPost = (val: Post | undefined): val is NonNullable<Post> => val !== undefined && val !== null;
