import express, { Request, Response } from 'express';
import { Admin } from '../models/admin';
import jwt, { Secret } from 'jsonwebtoken'
import { sendResponse } from '../errorHandler';
import { HTTPStatusCode, UserRoles } from '../enums';
import { auth } from '../middleware/auth';
import { CustomRequest } from '../types';
import { Receptionist } from '../models/receptionist';

const ADMIN = UserRoles.ADMIN;

const SECRET: Secret | undefined = process.env.SECRET || ""

const router = express.Router()

/**
 * RECEPTIONIST SERVICE
 *  1. login
 */

/**
 * PATIENT SERVICE
 * 1. create new user
 * 2. fetch all user, by query and filter and pagination
 * 3. update user
 * 4. notify user
 */


export default router;