require('dotenv').config();
import express from 'express';

const app = express();

app.use(
  `${process.env.APP_URI}/user`,
  require('./user.routes')
);

export default app;
