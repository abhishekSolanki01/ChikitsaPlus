import express, { Request, Response } from 'express';
import { Admin } from '../models/admin';
import jwt, { Secret } from 'jsonwebtoken'

const SECRET : Secret | undefined = process.env.SECRET || ""

const router = express.Router()
/**
 * 
 */

router.post('/signup', async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const user = await Admin.findOne({ userName });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new Admin({ userName, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
})


export default router;