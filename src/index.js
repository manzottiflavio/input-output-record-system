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

/*function gotIn(relatorio){
    const get =relatorio((name,operation)=>{
        if(operation.type === 'enter'){
            return name + date.operation;
        }else{
            return Date.now();
        }
    })
    return get;
}*/



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
        relatorio:[],
    });
    
    return response.status(201).json({message:"user create successful"});
    
});

app.post("/UserEnter",verifyIfCustomerAlredyExists,(request,response)=>{
    const {users}=request;
    const {name}=request.body;
    
    const getIn={
        name,
        enter_at: new Date(),
        type:"came in",
    };
    console.log(getIn)
    users.relatorio.push(getIn)
    
    return response.status(201).json({message:" enter confirmed"});
    
});

app.post("/UserOut",verifyIfCustomerAlredyExists,(request,response)=>{
    const {users}=request;
    const {name}=request.body
    
    const getOut={
        name,
        exit_at: new Date(),
        type:"came out",
    };
    
    users.relatorio.push(getOut)
    console.log(getOut)
    return response.status(201).json({message:"exit confirmed"});
    
});
app.get("/create",verifyIfCustomerAlredyExists,(request,response)=>{
    const {users}=request;
    return response.status(201).json(users);
})

app.get("/UserEnter",verifyIfCustomerAlredyExists,(request,response)=>{
    const {users}=request;
    const get=gotIn(users.relatorio);
    if(get===null){
        return response.status(400).json({message:"error"})
    }else{
        console.log(get)
        return response.status(201).json(get)
    };
    
    
    
    
})