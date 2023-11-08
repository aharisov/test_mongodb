import dotenv from "dotenv";
import { connect } from "mongoose";
dotenv.config();

const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_NAME } = process.env;

const uri = `mongodb://${DB_HOST}:${DB_PORT}`;
export const mongoConnect = connect(uri, { dbName: DB_NAME, user: DB_USER, pass: DB_PASS }).then(() => {
    console.log('connected');
}).catch(e => console.log('connection failed ' + e.message));