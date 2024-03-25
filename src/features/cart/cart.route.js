import express from "express";
import CartController from "./cart.controller.js";
const cartController = new CartController();
const CartRouter = express.Router();
//import {uploadFile} from "../../middlewares/upload.middleware.js";


CartRouter.post('/',cartController.add);
CartRouter.get('/',cartController.get);
CartRouter.delete('/:id',cartController.delete)


export default CartRouter;