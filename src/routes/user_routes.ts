import expess, { Router } from "express";
export const userRouter = Router();
import { 
    getAllUsersControl, 
    getUserByIdControl, 
    getUserByEmailControl, 
    updateUserControl,
    deleteUserControl
} from "../controllers/user_controller";
import { checkToken } from "../middlewares/check_token";

// create route for getting all users
userRouter.get("/users/users-list", getAllUsersControl);
// create route for getting user by id
userRouter.get("/users/user/by-id/:id", getUserByIdControl);
// create route for getting user by email
userRouter.get("/users/user/by-email/:email", getUserByEmailControl);
// create route for updating user by id
userRouter.put("/users/user/update/:id", updateUserControl);
// create route for deleting user by id
userRouter.delete("/users/user/delete/:id", deleteUserControl);
