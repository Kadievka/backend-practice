require('dotenv').config();
import express from 'express';

const app = express();

app.use(
  `${process.env.APP_URI}/user`,
  require('./user.routes')
);

app.use(
  `${process.env.APP_URI}/posts`,
  require('./post.routes')
);

export default app;
