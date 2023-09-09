import mongoose, { Mongoose, Schema, mongo } from 'mongoose'
import { userSchema } from './user'

const receptionistSchema = new Schema({
    ...userSchema,
    parentAdminId: {type : mongoose.Types.ObjectId, ref: 'Admin'},
    disabled: Boolean
},{ timestamps: true })

export const Receptionist = mongoose.model('Receptionist', receptionistSchema)