import mongoose, { Schema } from 'mongoose'
import { userSchema } from './user'

const receptionistSchema = new Schema({
    ...userSchema,
    
},{ timestamps: true })

export const Receptionist = mongoose.model('Receptionist', receptionistSchema)