// add library
import { Schema, model } from "mongoose";
import { mongoConnect } from "../config/connection";

//const mongoose = require("mongoose");

// Create an interface representing a document in MongoDB.
interface IUser {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

// Create a Schema corresponding to the document interface. 
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: String
}); 

// Create a Model.
const User = model<IUser>('User', userSchema);

//console.log(mongoConnect);
// mongoConnect;

// create user
export function userSignUp (name: string, email: string, password: string, avatar: string): Promise<any> {
    
    const user: any = new User({
        name: name,
        email: email,
        password: password,
        avatar: avatar
    });

    const result: Promise<any> = user.save();

    return result; 
}

// get users
export function getAllUsers(): Promise<any> {
    
    const users: Promise<any> = User.find();
    //console.log(users);
    
    return users;
}

// get user by id
export function getUserById(id: string): Promise<any> {
    
    const user: Promise<any> = User.findById(id).exec();

    return user;
}

// get user by email
export function getUserByEmail(email: string): Promise<any> {
    
    const user: Promise<any> = User.findOne({ "email": email }).exec();

    return user;
}

// update user
export function updateUser(filter: object, props: object): Promise<any> {
    
    const user: Promise<any> = User.findOneAndUpdate(filter, props);
    
    return user;
}

// delete user
export function deleteUser(filter: object): Promise<any> {
    
    const user: Promise<any> = User.findOneAndDelete(filter);
    
    return user;
} 