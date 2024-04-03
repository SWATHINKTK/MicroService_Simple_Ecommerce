import express, { Request,Response,NextFunction } from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { productRouter } from "./routes/productRouter";

const app = express();

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));
  
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/micro")
        .then(() => console.log('DB Connection Successful.'))
        .catch((error) =>  console.log("Connection Error", error))
}
connectDB();

app.use('/product',productRouter)



app.listen(4000,()=> {
    console.log("port is running @ 4000")
})











































