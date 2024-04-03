import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import 'dotenv/config'; 

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middleware/error-handler';

const app = express();


import cors from 'cors';
app.use(cors({
  origin: 'http://localhost:5174', 
  credentials: true 
}));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/users/use',(req,res) => {
  res.send('hello')
})

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);


const start = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Database Connection Successful');

    app.listen(3000, () => {
      console.log('Listening on port 3000!!!!!!!!');
    });
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
};

start();
