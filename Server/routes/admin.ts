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
 *  ADMIN SERVICE
 */
// signup
router.post('/signup', async (req: Request, res: Response) => {
  const { userName, password, contactNumber, firstName, lastName } = req.body;
  const user = await Admin.findOne({ userName, contactNumber });
  if (user) {
    sendResponse(res, { status: HTTPStatusCode.UNAUTHORIZED, message: 'User already exists', error: true })
    // res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new Admin({ userName, password, contactNumber, firstName, lastName });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
    sendResponse(res, { status: HTTPStatusCode.OK, error: false, message: 'User created successfully', data: { token } })
    // res.json({ message: 'User created successfully', token });
  }
})

// login
router.post('/login', async (req, res) => {
  const { userName, password } = req.body;
  const getUser = await Admin.findOne({ userName, password }).lean();
  if (!getUser) {
    sendResponse(res, { error: true, status: HTTPStatusCode.BADREQUEST, message: "User name and password is incorrect" })
  } else {
    const token = jwt.sign({ id: getUser._id }, SECRET, { expiresIn: '1h' });
    sendResponse(res, { status: HTTPStatusCode.OK, error: false, message: 'User logged in successfully', data: { token } })
  }
})

// me
router.get('/me', auth(ADMIN), (req, res) => {
  try {
    sendResponse(res, { status: HTTPStatusCode.OK, error: false, message: 'User logged in successfully', data: { user: (req as CustomRequest).user } })
  } catch (error) {
    sendResponse(res, { status: HTTPStatusCode.INTERNALSERVERERROR, error: false, message: 'Internal Server error' })
  }
})

/**
 *  RECEPTIONIST SERVICE
 */
// add receptionist
router.post('/receptionist', auth(ADMIN), async (req, res) => {
  try {
    const { firstName, lastName, gender, contactNumber, email, password, userName, disabled } = req.body;

    // check if receptionist of username and contact no already exist
    const checkReceptionist = await Receptionist.findOne({ userName, contactNumber }).lean();
    if (checkReceptionist) {
      sendResponse(res, { status: HTTPStatusCode.FORBIDDEN, error: false, message: 'Receptionist with same userName or contact number already exist' })
      return
    }

    const newReceptionistUser = new Receptionist({ firstName, lastName, gender, contactNumber, email, password, userName, parentAdminId: (req as CustomRequest).user._id })
    const receptionistUser = await newReceptionistUser.save();
    if (!receptionistUser) {
      sendResponse(res, { status: HTTPStatusCode.INTERNALSERVERERROR, error: true, message: 'Internal Server error' })
      return
    }

    sendResponse(res, { status: HTTPStatusCode.OK, error: false, message: 'Receptionist added sucessfuly', data: receptionistUser })

  } catch (error) {
    sendResponse(res, { status: HTTPStatusCode.INTERNALSERVERERROR, error: true, message: 'Internal Server error' })
  }
})

// delete receptionist
router.delete('/receptionist:id', auth(ADMIN), async (req, res) => {
  try {
    const {id} =  req.params;
    const checkReceptionist = await Receptionist.findById(id);
    if(!checkReceptionist){
      sendResponse(res, { status: HTTPStatusCode.BADREQUEST, error: true, message: 'Receptionist does not exist' })
      return
    }

    const deleteReceptionist = await Receptionist.findByIdAndDelete(id);
    sendResponse(res, { status: HTTPStatusCode.OK, error: false, message: 'Receptionist deleted seccessfully' })


  } catch (error) {
    sendResponse(res, { status: HTTPStatusCode.INTERNALSERVERERROR, error: true, message: 'Internal Server error' })
  }
})

// modify receptionist
router.patch('/receptionist:id', auth(ADMIN), async (req, res) => {
  try {
    const { firstName, lastName, gender, email, password, userName, disabled } = req.body;
    const {id} =  req.params;
    const checkReceptionist = await Receptionist.findById(id);
    if(!checkReceptionist){
      sendResponse(res, { status: HTTPStatusCode.BADREQUEST, error: true, message: 'Receptionist does not exist' })
      return
    }

    const update : any = {};
    if(firstName) update.firstName = firstName
    if(lastName) update.lastName = lastName
    if(gender) update.gender = gender
    if(email) update.email = email
    if(password) update.password = password
    if(userName) update.userName = userName
    if(disabled) update.disabled = disabled
     
    const updateReceptionist = await Receptionist.findByIdAndUpdate(id,update,{new: true}).lean();

    if(!updateReceptionist){
      sendResponse(res, { status: HTTPStatusCode.INTERNALSERVERERROR, error: true, message: 'Internal Server error' })
      return
    }
    sendResponse(res, { status: HTTPStatusCode.OK, error: false, message: 'Receptionist Updated', data: updateReceptionist })

  } catch (error) {
    sendResponse(res, { status: HTTPStatusCode.INTERNALSERVERERROR, error: true, message: 'Internal Server error' })
  }
})


/**
 * PATIENT SERVICE
 */

export default router;