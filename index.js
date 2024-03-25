import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.route.js";
import cartRouter from "./src/features/cart/cart.route.js";

import cookieParser from "cookie-parser";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import { connectToMongoDB } from "./src/config/mongoDB.js";
import session from "express-session";

const Port = 5000;

const app = express();
//app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())
app.use(session({secret:"mysecretkey",saveUninitialized:true,resave:false}))
app.use('/api/products',jwtAuth,productRouter);
app.use('/api/user',userRouter);
app.use('/api/cart',jwtAuth,cartRouter);

app.get('/',(req, res)=>{
    res.send("This is Express app")
})
app.listen(Port, () =>{
    connectToMongoDB();
    console.log(`Server is listenting to the port ${Port}`);
})