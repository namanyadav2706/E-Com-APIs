import { getDB } from "../../config/mongoDB.js";

export default class UserRepository{
    constructor(){
        this.collection = "users"
    }

    async signUp(user){
        try{
            const db = getDB()
            const collection = db.collection(this.collection)
            await collection.insertOne(user)
            return user
        }catch(err){
            console.log(err)
            res.status(500).send("Database Error!!!")
        }
    }

    async signIn(email,password){
        try{
            const db = getDB()
            const collection = db.collection(this.collection)
            const user = await collection.findOne({email,password});
            return user
        }catch(err){
            console.log(err)
            res.status(500).send("Database Error!!!")
        }
    }

    async findByEmail(email){
        try{
            const db = getDB()
            const collection = db.collection(this.collection)
            const user = await collection.findOne({email});
            return user
        }catch(err){
            console.log(err)
            res.status(500).send("Database Error!!!")
        }
    }

}