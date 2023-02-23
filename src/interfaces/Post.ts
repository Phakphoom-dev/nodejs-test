import { Comment } from "./Comment";

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  comments: Comment[];
}
