import UserModel from "../user/user.model.js";

export default class ProductModel{
    constructor(name,desc,price,category,sizes,ratings){
        this.name = name;
        this.desc = desc;
        this.price = price;
        // this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
        this.ratings = ratings;
    }

    

    static filter(minPrice,maxPrice,category){
        const results = products.filter(p=> {
            return(
            (!minPrice || p.price >= minPrice) &&
            (!maxPrice || p.price <= maxPrice) &&
            (!category || p.category == category)
            );
        });
        return results;
    }

    static ratings(userID,productID,rating){
        // verify user
        const user = UserModel.getAll().find(u=> u.id == userID)
        if(!user){
            return "User not found"
        }

        // verify product
        const product = products.find(p=> p.id == productID);
        if(!product){
            return "Product not found"
        }

        // check rating for the product, if not available add
        if(!product.ratings){
            product.ratings = [];
            product.ratings.push(
                {
                    userID: userID,
                    rating: rating
                }
            );
        }else{
            // check if user rating already exist, if yes, update it
            const index = product.ratings.findIndex(r => r.userID == userID);
            
            if(index>=0){
                product.ratings[index] = {
                    userID: userID,
                    rating: rating
                }
            }else{
                // if not, add anew rating
                product.ratings.push({
                    userID: userID,
                    rating:rating
                })
            }
        }

    }
}

var products = [
    new ProductModel(1,"Atomic Habits","A supremely practical and useful book.",150,"https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg","category1",[]),
    new ProductModel(2,"Ikigai","Japanese Secret to live a long and happy life",180,"https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg","category2",['S','M']),
    new ProductModel(3,"Deep Work","Rules for focused success in a distracted world",250,"https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg","category3",['S','M','XL']),
]