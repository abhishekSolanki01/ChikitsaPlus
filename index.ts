import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config'

const PORT = 3000

const app  = express();

app.use(cors());
app.use(express.json());

//routes
// app.use('/admin', adminRoutes)

//server run 
app.listen(PORT, () => {
    console.log("Server is running on port " +  PORT);
})

//@ts-ignore
mongoose.connect(process.env.MONGO_URI, {dbNAme: 'chikitsa'})