import express from "express";
import UserController from "./user.controller.js";
const userController = new UserController();
const UserRouter = express.Router();
//import {uploadFile} from "../../middlewares/upload.middleware.js";


UserRouter.post('/signin',(req,res)=>{userController.singInUser(req,res)});
UserRouter.post('/signup',(req,res)=>{userController.signUpUser(req,res)});

export default UserRouter;