require('dotenv').config();
const express = require('express');
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const commentRouter = require('./routers/comment');

const app = express();
app.use(express.json());

//routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/comment', commentRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
