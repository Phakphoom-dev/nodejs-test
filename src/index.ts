import express, { Express } from 'express';
import dotenv from 'dotenv';
import { User } from './interfaces/User';
import { Post } from './interfaces/Post';


dotenv.config();

const users: User[] = [
  { id: 1, name: 'Luke'},
  { id: 2, name: 'Anakin'},
  { id: 3, name: 'Yoda'}
]

const posts: Post[] = [{
  id: 1,
  title: "post",
  content: "post content",
  userId: 1,
  comments: [
    {
      id: 1,
      content: "Comment Ja",
      userId: 1,
      postId: 1
    },
    {
      id: 2,
      content: "Comment 2 Ja",
      userId: 2,
      postId: 1
    }
  ]
}];

const app: Express = express();
app.use(express.json());

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});