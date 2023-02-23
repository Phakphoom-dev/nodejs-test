import express, { Express, Request, Response } from 'express';
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

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/users', (req, res) => {
  res.json(users);
})

app.get('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(user => user.id === userId);
  if (user) {
    const userPosts = posts.filter(post => post.userId === userId);
    res.json({ name: user.name, posts: userPosts });
  } else {
    res.sendStatus(404);
  }
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  
  const id = users.length + 1;
  const newUser = { id, name, posts: [] };

  users.push(newUser);
  res.json(newUser);
});


app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  const find = users.find((e) => e.id === Number(id));

  if (find) {
    find.name = name
  }

  res.json(find);
});

app.get('/posts', (req, res) => {
  const postList = posts.map(post => ({
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId,
    commentCount: post.comments.length,
  }));
  res.json(postList);
});

app.get('/posts/:postId', (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = posts.find(post => post.id === postId);
  res.json(post)
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});