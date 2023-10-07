import express from "express";
import productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";

const Port = 5000;

const app = express();
app.use(bodyParser.json());

app.use('/api/products',productRouter);
app.get('/',(req, res)=>{
    res.send("This is Express app")
})
app.listen(Port, () =>{
    console.log(`Server is listenting to the port ${Port}`);
})