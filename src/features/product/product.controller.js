import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    constructor(){
        this.productRepository = new ProductRepository
    }

    async getAllProducts(req,res){
        const products = await this.productRepository.getAll();
        res.status(200).send(products);
    }

    deleteProduct(req,res){

    }

    async getOneProduct(req,res){
        const id = req.params.id;
        const productFound = await this.productRepository.get(id);
        if(!productFound){
            return res.status(404).send("Product not found")
        }else{
            return res.status(200).send(productFound);
        }
    }

    async addProduct(req,res){
        console.log(req.body)
        const {name,desc,price,category,sizes,ratings} = req.body;
        const product = new ProductModel(name,desc,parseFloat(price),category,sizes.split(','),ratings);
        const createdProduct = await this.productRepository.add(product)
        console.log(createdProduct)
        res.status(201).send(createdProduct);
    }

    async postRating(req,res){
        const userID = req.userid;
        const productID  = req.body.productID;
        const rating = req.body.rating;

        await this.productRepository.rate(userID,productID,rating)
        res.status(200).send("Rating added Successfully")
    }

    async filterProduct(req,res){
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const result = await this.productRepository.filter(minPrice,maxPrice,category);
        res.status(200).send(result);
    }
}    