const express=require("express");
const app = express();
const cors=require("cors");
const bankModel=require("./Models/bankModel");
const mongoose=require("mongoose");
const ConnectDB=require('./db')
const benefModel=require('./Models/benefModel')


app.use(cors());   //cross origine
app.use(express.json()); //to communicate with json data

app.get('/',(req,res)=>{
    res.send("Welcome to GOPDAC");
});

app.get("/banks",async (req,res)=>{
    ConnectDB();
    const result=await bankModel.find({});
    res.send(result);

})

app.get('/addbank',(req,res)=>{
    ConnectDB();
    const bank={
        name:"Axis Bank",
        branch:"Chinchwad",
        city:"Pune",
    };
    const newBank= new bankModel(bank);
     newBank.save();
});

app.post('/deposit',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

app.post('/api/addbank',(req,res)=>{
    ConnectDB();
    const newBank= new bankModel(req.body);
    newBank.save();
    res.send("new bank added successfully");
    // console.log(req.body);
    // res.send(req.body);
})

app.post('/api/getbank',async (req,res)=>{
    ConnectDB();
    const result= await bankModel.find(req.body)
    res.send(result)
})

///////////+++Benefinicaries ++++//////////

app.post('/api/getBenef', async(req,res)=>{
    ConnectDB();
    const result= await benefModel.find(req.body)
    res.send(result)
});

app.post('/api/addbenef',async(req,res)=>{
    ConnectDB();
    const newBenef= new benefModel(req.body);
    newBenef.save();
    res.send("New Beneficiaries Added Successfully.!");
})

app.listen('3030',()=>{
    console.log(`Connected to server :3030`);
})

