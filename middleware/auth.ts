import express, { NextFunction, Request, Response } from 'express'
import { HTTPStatusCode, UserRoles } from '../enums';
import { sendResponse } from '../errorHandler';
import { Admin } from '../models/admin';
import { Patient } from '../models/patient';
import { Receptionist } from '../models/receptionist';
import jwt, { Secret } from 'jsonwebtoken';

const SECRET : Secret | undefined = process.env.SECRET;

interface CustomRequest extends Request{
    user : Object
}

export const auth = (role: String) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let userDB: any;
        switch (role) {
            case UserRoles.ADMIN:
                userDB = Admin
                break;
            case UserRoles.PATIENT:
                userDB = Patient
                break;
            case UserRoles.RECEPTIONIST:
                userDB = Receptionist
                break;
        }

        const authorization = req.headers.authorization;
        if (!authorization) {
            sendResponse(res, { status: HTTPStatusCode.UNAUTHORIZED, error: true, message: "Unauthorize" })
            return
        }
        const token = authorization?.split(" ")[1];
        const decodedToken = jwt.verify(token, SECRET || "");
        if(!decodedToken || typeof decodedToken === "string"){
            sendResponse(res, { status: HTTPStatusCode.UNAUTHORIZED, error: true, message: "Unauthorize" })
            return
        }
        const userDetails = await userDB && userDB.findOne({ userName: decodedToken.id }).lean();

        if (!userDetails) {
            sendResponse(res, { status: HTTPStatusCode.UNAUTHORIZED, error: true, message: "Unauthorize" })
            return
        }

        (req as CustomRequest).user = userDetails;
        next();
    } catch (e) {
        sendResponse(res, { status: HTTPStatusCode.INTERNALSERVERERROR, error: true, message: "Internal server error" })
        return
    }
}