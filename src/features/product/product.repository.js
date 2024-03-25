import { getDB } from "../../config/mongoDB.js"
import { ObjectId } from "mongodb";

export default class ProductRepository{
    constructor(){
        this.collection = "products"
    }
    async get(id){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const product = await collection.findOne({"_id":new ObjectId(id) });
            return product
        }catch(err){
            console.log(err)
            res.status(500).send("Database Error!!!")
        }
    }

    async getAll(){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            const products = await collection.find().toArray();
            return products
        }catch(err){
            console.log(err)
            res.status(500).send("Database Error!!!")
        }
    }

    async add(newProduct){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newProduct);
            return newProduct;
        }catch(err){
            console.log(err)
            res.status(500).send("Database Error!!!")
        }
    }

    async filter(minPrice,maxPrice,category){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);
            let filterExpression = {};
            if(minPrice){
                filterExpression.price = {$gte : parseFloat(minPrice)}
            }
            if(maxPrice){
                filterExpression.price = {...filterExpression.price,$lte : parseFloat(maxPrice)}
            }
            if(category){
                filterExpression.category = category
            }
            const result = await collection.find(filterExpression).toArray();
            return result
        }catch(err){
            console.log(err)
            res.status(500).send("Database Error!!!")
        }
    }

    async rate(userID,productID,rating){
        try{
            const db = getDB();
            const collection = db.collection(this.collection);

            // Delete the existing Rating
            await collection.updateOne({_id: new ObjectId(productID)},{
                $pull:{ratings:{userID:new ObjectId(userID)}}
            })

            //Post the rating
            await collection.updateOne({_id: new ObjectId(productID)},{
                $push:{ratings:{userID:new ObjectId(userID),rating}}
            })
        }catch(err){
            console.log(err)
            res.status(500).send("Database Error!!!")
        }
    }

}