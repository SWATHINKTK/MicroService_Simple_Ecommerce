import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { User } from "../model/user-model";
import { BadRequestError } from "../errors/bad-request";

const router = express.Router();

router.post(
    "/api/users/signup",
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
            const { username, email, password } = req.body;

            const existingEmail = await User.findOne({email})

            if(existingEmail){
                console.log('existing 1')
                throw new BadRequestError('Email is already in use.')
            }

            console.log('user1')
            const user = User.build({email,password,username});
            await user.save();
            console.log('user1')


            res.send(user)

      
        } catch (error) {
            next(error)
        }
    }
);

export { router as signupRouter };
