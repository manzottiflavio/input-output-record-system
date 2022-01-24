const express=require("express");
const {v4:uuidv4}=require("uuid");
const app=express();
app.use(express.json());
app.listen(9999);

const user=[];

function verifyIfCustomerAlredyExists(request,response,next){
    const {cpf}=request.headers;
    
    const users=user.find((users)=>users.cpf===cpf);
    if(!users){
        return response.status(401).json({message:"error user not found"});
    }
    
    request.user=user;
    return next();
    
};

app.post("/createUser",(request,response)=>{
    const {name,cpf}=request.body;
    
    const userAlreadyExists=user.some((users)=>users.cpf===cpf);
    if(userAlreadyExists){
        return response.status(401).json({message:"error user has already create"})
    };
    
    user.push({
        name,
        cpf,
        id:uuidv4(),
        date:new Date(),
        Statement:[],
    });
    console.log(user)
    return response.status(201).json({message:"user create successful"});
    
});

app.post("/UserEnter",verifyIfCustomerAlredyExists,(request,response)=>{
    const {cpf}=request;
    
    user.push({
        cpf,
        enter_at: new Date()
    });
    console.log(user)
    return response.status(201).json({message:"user enter"});
    
});

app.get("/create",verifyIfCustomerAlredyExists,(request,response)=>{
    const {cpf}=request;
    
    
    
    return response.status(201).json(user);
})