import { Response } from "express";
import { HTTPStatusCode } from "../enums";

interface ResponseObj {
    error : Boolean,
    message: String,
    status: number,
    data?: Object
}

export const sendResponse = (res: Response, obj: ResponseObj) : void => {
    res.status(obj.status).json(obj)
    return;
}