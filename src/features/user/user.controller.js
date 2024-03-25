import UserModel from "./user.model.js";
import UserRepository from "./user.repository.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export default class UserController {
    constructor(){
        this.userRepository = new UserRepository()
    }

    async singInUser(req, res) {
        try{
            const { email, password } = req.body;
            const user = await this.userRepository.findByEmail(email)
            const result = await bcrypt.compare(password,user.password)
            if(result){
                const token = jwt.sign(
                    {
                        userID : user._id,
                        email: user.email
                        },
                        "mysecretkey",
                        {
                            expiresIn:"15d"
                        }
                        
                    )
                    res.cookie('user',token)
                    res.status(200).json({
                        message:"Logged In Successful!!!",
                        user:user
                    })
            }else{
                res.status(400).send("Wrong Credientials")
            }
        }catch(err){
            console.log(err)
            res.status(500).send("Internal Server Error!!!")
        }
    }

    async signUpUser(req, res) {
        try{
            const { name, email, password, type } = req.body;
            const hashedPassword = await bcrypt.hash(password,12)
            const user = new UserModel(name,email,hashedPassword,type);
            const result = await this.userRepository.signUp(user);
            res.status(201).send(result);
        }catch(err){
            console.log(err)
            res.status(500).send("Internal Server Error!!!")
        }
    }

}