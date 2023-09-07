import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: String,
    password: String,
})


export const user = mongoose.model('User', userSchema)