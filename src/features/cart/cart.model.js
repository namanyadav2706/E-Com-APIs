import UserModel from "../user/user.model.js";
import ProductModel from "../product/product.model.js";

export default class CartModel{
    constructor(id,productid,userid,quantity){
        this.id = id;
        this.productid = productid;
        this.userid = userid;
        this.quantity = quantity;
    }

    static add(productID,userID,quantity){
        // verify user
        const user = UserModel.getAll().find(u=> u.id == userID)
        if(!user){
            return "User not found"
        }

        // verify product
        const product = ProductModel.getAll().find(p=> p.id == productID);
        if(!product){
            return "Product not found"
        }

        let cartItem = new CartModel(productID,userID,quantity)
        cartItem.id = cartItems.length + 1;
        cartItems.push(cartItem)
    }

    static get(userid){
        const items = cartItems.filter(i=> i.userid == userid);
        return items;
    }

    static delete(cartID,userID){
        const index = cartItems.findIndex(i => i.id == cartID && i.userid == userID);

        if(index == -1){
            return "cart item not found"
        }else{
            cartItems.splice(index, 1);
        }
    }
}

let cartItems = [
    new CartModel(1,1,1,1)
]