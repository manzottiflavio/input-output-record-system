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
    
    request.users=users;
    return next();
    
};

function operation(relatorio){



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
       relatoro:[],
    });
    console.log(user)
    return response.status(201).json({message:"user create successful"});
    
});

app.post("/UserEnter",verifyIfCustomerAlredyExists,(request,response)=>{
    const {users}=request;
    const {name}=request.body
    
    user.operation=({
        name,
        enter_at: new Date(),
        type:"enter",
    });

    user.relatorio.push(operation)

    return response.status(201).json({message:" enter confirmed"});
    
});

app.get("/create",verifyIfCustomerAlredyExists,(request,response)=>{
    const {users}=request;
    const {cpf}=request;
    
    
    
    return response.status(201).json(user);
})