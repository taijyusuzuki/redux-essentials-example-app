import { Notifications } from "@/features/notifications/notificationsSlice";
import { Post } from "@/features/posts/postsSlice";
import { Users } from "@/features/users/usersSlice";

export const isPost = (val: Post | undefined | null): val is NonNullable<Post> => val !== undefined && val !== null;

export const isUsers = (val: Users | undefined | null): val is NonNullable<Users> => val !== undefined && val !== null;

export const isNotifications = (val: Notifications | undefined | null): val is NonNullable<Notifications> => val !== undefined && val !== null;

export const compareDate = (date1: string | undefined, date2: string | undefined): number => {
  if (date1 === undefined || date2 === undefined) {
    return 0;
  }
  return date2.localeCompare(date1);
};
