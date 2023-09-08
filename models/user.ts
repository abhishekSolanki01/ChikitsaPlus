import mongoose, { Schema } from "mongoose";

export const userSchema = new Schema({
    firstName: {
        type: String, 
        lowercase: true, 
        trim: true
    },
    lastName: {
        type: String, 
        lowercase: true, 
        trim: true
    },
    gender: {
        type: String, 
        lowercase: true,
        enum: ['male', 'female', 'other'], 
        trim: true
    },
    dob: {
        type: Date, 
        trim: true
    },
    contactNumber: {
        type: Number, 
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    address: {
        type: String,
        trim: true
    },
    userName: {
        type: String, 
        lowercase: true, 
        trim: true,
        required: true
    },
    password: {
        type: String, 
        lowercase: true, 
        trim: true
    },
})


// export userSchema //user = mongoose.model('User', userSchema)