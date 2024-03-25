export default class UserModel{
    constructor(name,email,password,type){
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
    }

    static SignUp(user){
        user.id = users.length + 1;
        users.push(user);
        return user;
    }

    static SignIn(email,password){
        const user = users.find(u=> u.email == email && u.password == password);
        return user;
    }

    static getUser(email){
        const user = users.find(u=> u.email == email);
        if(user){
            return true
        }else{
            return false
        }
    }

    static getAll(){
        return users;
    }
}

var users = [
    new UserModel(1,"Seller","seller@live.com","password1","seller"),
]