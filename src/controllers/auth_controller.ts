// include libraries
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// import signp function
import { userSignUp, getUserByEmail } from "../models/user_model";

// import user type
const env = dotenv.config();
const { JWT_SECRET } = process.env;

export function authSignUp(req: Request, res: Response): void {
    
    // get name, email and password from request
    const { name, email, password, avatar } = req.body;
    
    const result: Promise<any> = getUserByEmail(email);

    result.then(function(user: any){
        
        // if user found return error
        if (!user) {
            
            res.status(409).json({"error": "User with such email exists"});

        } else { // register user

            // crypt user's password
            bcrypt.hash(password, 10).then(newPassword => {
                
                // save user
                userSignUp(name, email, newPassword, avatar);

                // send response ok
                res.status(201).json({
                    "message": "User created" 
                })

            }).catch(error => {
                
                // send error response
                res.status(500).json({
                    "error": error.message
                })
            });
        }
        
    })

}

export function authSignIn(req: Request, res: Response): void {
    
    // get email and password from request
    const { email, password } = req.body;
    //console.log(req.body);
    
    // search for user in db
    const result: Promise<any> = getUserByEmail(email);

    result.then(function(user: any){

        // if user found
        if (user != null) {

            // compare password with saved hash
            bcrypt.compare(password, user.password).then(passwordOk => {
                
                // if ok create token
                if (passwordOk) {
                    
                    // TODO process.env.JWT_TOKEN does not work 
                    const token: string = jwt.sign({name: user.name, email: user.email}, "my-secret-key", {expiresIn: "1h"});

                    // send token to user
                    res.status(200).json({
                        "token": token
                    })

                } else {

                    res.status(500).json({
                        "error": "Bad password"
                    })
                }
            }).catch(error => console.log('bcrypt', error))

        } else {
            
            // if user not found send 404
            res.status(404).json({
                "error": "User not found"
            })
        }
    })
}