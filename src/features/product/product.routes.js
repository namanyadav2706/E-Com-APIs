import express from "express";
import ProductController from "./product.controller.js";
const productController = new ProductController();
const ProductRouter = express.Router();
import {uploadFile} from "../../middlewares/upload.middleware.js";


ProductRouter.get('/', (req,res)=> {productController.getAllProducts(req,res)});
// ProductRouter.post('/',uploadFile.single('imageUrl'),(req,res)=> productController.addProduct(req,res));
ProductRouter.post('/',(req,res)=> {productController.addProduct(req,res)});
ProductRouter.get('/filter',(req,res)=> {productController.filterProduct(req,res)});
ProductRouter.get('/:id',(req,res)=> {productController.getOneProduct(req,res)});
ProductRouter.post('/rate',(req,res)=> {productController.postRating(req,res)});


export default ProductRouter;