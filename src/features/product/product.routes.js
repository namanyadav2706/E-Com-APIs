import express from "express";
import ProductController from "./product.controller.js";
const productController = new ProductController();
const ProductRouter = express.Router();
import {uploadFile} from "../../middlewares/upload.middleware.js";


ProductRouter.get('/',productController.getAllProducts);
ProductRouter.post('/',uploadFile.single('imageUrl'),productController.addProduct);
ProductRouter.get('/filter',productController.filterProduct);
ProductRouter.get('/:id',productController.getOneProduct);


export default ProductRouter;