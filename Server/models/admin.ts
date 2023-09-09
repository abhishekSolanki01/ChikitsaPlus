import mongoose, { Schema } from 'mongoose';
import { userSchema } from './user';

const adminSchema = new Schema({
    ...userSchema,
},
{ timestamps: true })

export const Admin = mongoose.model('Admin', adminSchema)