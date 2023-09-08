import mongoose, { Schema } from 'mongoose';

const appointmentSchema = new Schema({
    patientId: {
        type: mongoose.Types.ObjectId,
        ref: 'Patient',
        required: true,
    },
    receptionistId: {
        type: mongoose.Types.ObjectId,
        ref: 'Receptionist'
    },
    doctorName: {
        type: String,
        trim: true
    },
    appointmentAt: Date,
    informedOn: Date,
    appointmentType: {
        type: String,
        enum: ['prebook', 'ontime']
    },
    attendedStatus: {
        type: String,
        lowercase: true,
        enum: ["new", "informed", "attended", 'not-attended']
    } 
}, {timestamps: true})

export const Appontment = mongoose.model('Appointment', appointmentSchema)