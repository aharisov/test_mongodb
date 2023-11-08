import { Request, Response } from "express";
import { 
    getAllUsers, 
    getUserById, 
    getUserByEmail, 
    updateUser, 
    deleteUser 
} from "../models/user_model";
const express = require('express');
const app = express();

// Use the express.json middleware
app.use(express.json());

// contoller for showing all users
export function getAllUsersControl(req: Request, res: Response): void {
    
    const result: Promise<any> = getAllUsers();
    
    result.then(function(elems: any){
        
        res.status(200).json(elems);
    })
}

// contoller for showing user by id
export function getUserByIdControl(req: Request, res: Response): void {
    
    const id: string = req.params.id;
    const result: Promise<any> = getUserById(id);

    result.then(function(user: any){
        
        if (user) {
            
            res.status(200).json(user);
        } else {
            console.log(user);
            res.status(404).json({"error": "User not found"});
        }
        
    }).catch((e) => {
        console.log(e);
        res.status(500).json({"error": e.message});
    });
}

// contoller for showing user by email
export function getUserByEmailControl(req: Request, res: Response): void {
    
    const email: string = req.params.email;
    const result: Promise<any> = getUserByEmail(email);

    result.then(function(user: any){
        
        if (user != null) {
            
            res.status(200).json(user);
        } else {

            res.status(404).json({"error": "User not found"});
        }
        
    })
}

// contoller for updating user
export function updateUserControl(req: Request, res: Response): void {
    
    // console.log(req.body.name); 

    const { name, email, avatar } = req.body;
    const id: string = req.params.id;
    const result: Promise<any> = updateUser(
        {_id: id}, 
        {name, email, avatar}
    );

    result.then(function(user: any){
        
        if (user == null) {
            
            res.status(404).json({
                "message": "User with id " + id + " not found"
            })

        } else {

            res.status(207).json({
                "message": "Updated user with id " + id
            })

        }
    })
}

// contoller for deleting user
export function deleteUserControl(req: Request, res: Response): void {
    
    const id: string = req.params.id;
    const result: Promise<any> = deleteUser({_id: id});

    result.then(function(user: any){
        
        if (user == null) {
    
            res.status(404).json({
                "message": "User with id " + id + " not found"
            })

        } else {

            res.status(207).json({
                "message": "Deleted user with id " + id
            })

        }
    })
}
