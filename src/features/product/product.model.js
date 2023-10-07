export default class ProductModel{
    constructor(id,name,desc,price,imageUrl,category,sizes){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
    }

    static getAll(){
        return products;
    }
    static add(product){
        product.id = products.length+1;
        products.push(product);
        return product;
    }

    static get(id){
        const product = products.find(p=> p.id == id)
        return product;
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
}

var products = [
    new ProductModel(1,"Atomic Habits","A supremely practical and useful book.",150,"https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg","category1",[]),
    new ProductModel(2,"Ikigai","Japanese Secret to live a long and happy life",180,"https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg","category2",['S','M']),
    new ProductModel(3,"Deep Work","Rules for focused success in a distracted world",250,"https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg","category3",['S','M','XL']),
]