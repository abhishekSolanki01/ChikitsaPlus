import mongoose, { Schema } from 'mongoose'
import { userSchema } from './user'

const patientSchema = new Schema({
    ...userSchema,
    medicalHistory: String,
    alergies: String,
},{ timestamps: true });

export const Patient = mongoose.model('Patient', patientSchema);