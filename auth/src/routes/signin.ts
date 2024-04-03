import express, { NextFunction, Request, Response } from "express";
import 'dotenv/config';
import { body, validationResult } from "express-validator";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../model/user-model";
import { BadRequestError } from "../errors/bad-request";


const router = express.Router();

router.post('/api/users/signin',
[
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage("Password must be between 4 and 20 characters"),
],
async (req: Request, res: Response, next:NextFunction) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new RequestValidationError(errors.array());
        }
        const { email, password } = req.body;

        const existingEmail = await User.findOne({email});
        if(!(existingEmail && await bcrypt.compare(password, existingEmail.password))){
            throw new BadRequestError('email id is invalid');
        }


        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new BadRequestError('Server error');
        }

        const user = {
            id:existingEmail._id,
            email:existingEmail.email
        }

        const token = jwt.sign(user,secret ,{
            expiresIn:'1d'
        })



        res.status(201).status(201).cookie('userToken',token,{
            maxAge: 86400000, 
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        }).json({
            loginSuccess:true,
            user
        });
        
        
    } catch (error) {
        next(error);
    }
});

export { router as signinRouter };
