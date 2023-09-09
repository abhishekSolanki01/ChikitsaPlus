import { Request } from "express";

interface USER {
    _id?: String,
    firstName?: String, 
    lastName?: String, 
    gender?: String, 
    contactNumber?: number, 
    email?: String, 
    password?: String, 
    userName?: String
}

export interface CustomRequest extends Request {
    user: USER
}