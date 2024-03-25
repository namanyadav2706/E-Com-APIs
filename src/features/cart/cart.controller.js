import CartModel from "./cart.model.js";

export default class CartController{
    add(req,res){
        const productID = req.query.productid;
        const quantity = req.query.quantity;

        const userID = req.userid;

        const error = CartModel.add(productID,userID, quantity);
        if(error){
            res.status(400).send(error);
        }else{
            res.status(201).send("Cart Updated")
        }
        

    }

    get(req,res){
        const userID = req.userid;

        const items = CartModel.get(userID)
        res.status(200).send(items);

    }

    delete(req,res){
        const cartID = req.params.id;
        const userID = req.userid;

        const error = CartModel.delete(cartID,userID)
        if(error){
            res.status(404).send(error);
        }else{
            res.status(201).send("Cart Deleted")
        }
    }
}