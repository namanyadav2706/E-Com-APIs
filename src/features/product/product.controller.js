import ProductModel from "./product.model.js";

export default class ProductController{
    getAllProducts(req,res){
        const products = ProductModel.getAll();
        res.status(200).send(products);
    }

    deleteProduct(req,res){

    }

    getOneProduct(req,res){
        const id = req.params.id;
        const productFound = ProductModel.get(id);
        if(!productFound){
            return res.status(404).send("Product not found")
        }else{
            return res.status(200).send(productFound);
        }
    }

    addProduct(req,res){
        const {name,desc,price,category,sizes} = req.body;
        const newProduct = {
            name,
            desc,
            price: parseFloat(price),
            imageurl: req.file.filename,
            category,
            sizes: sizes.split(',')
        }

        const createdProduct = ProductModel.add(newProduct);
        res.status(201).send(createdProduct);
    }

    postRating(req,res){

    }

    filterProduct(req,res){
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        console.log(req.query);
        const result = ProductModel.filter(minPrice,maxPrice,category);
        res.status(200).send(result);
    }
}    