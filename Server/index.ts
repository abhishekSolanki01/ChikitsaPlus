import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'

import adminRoutes from './routes/admin'

const app  = express();

app.use(cors());
app.use(express.json());

//routes
app.use('/admin', adminRoutes)

//server run 
app.listen(process.env.APP_PORT, () => {
    console.log("Server is running on port " +  process.env.APP_PORT);
})

//@ts-ignore
mongoose.connect(process.env.MONGO_URI, {dbNAme: process.env.MONGO_DB_NAME})