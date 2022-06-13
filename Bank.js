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
});

app.get('/benef',async(req,res)=>{
    ConnectDB();
    const result=await benefModel.find({});
    res.send(result)
})

app.post('/api/updatebenef',async (req,res)=>{
    ConnectDB();
    const currBenef = await benefModel.findOne({accno:req.body.accno});
    const newBenef ={
        accno:currBenef.accno,
        bankname:currBenef.bankname,
        branchname:currBenef.branchname,
        bname:currBenef.bname,
        amnt: currBenef.amnt+ Number(req.body.amnt),
        isActive:currBenef.isActive,
    };
    currBenef.overwrite(newBenef);
    currBenef.save();
    res.send("Amount "+req.body.amnt+" Deposit Successfully. New Balance is: "+newBenef.amnt)

}
)

app.post('/api/debit',async (req,res)=>{
    ConnectDB();
    const currBenef= await benefModel.findOne({accno:req.body.accno});
    const updateBenef ={
        accno:currBenef.accno,
        bankname:currBenef.bankname,
        branchname:currBenef.branchname,
        bname:currBenef.bname,
        amnt: currBenef.amnt - req.body.amnt,
        isActive:currBenef.isActive,

    }
    currBenef.overwrite(updateBenef);
    currBenef.save();
    res.send("Amount "+req.body.amnt+" Debited Successfully. New Balance is: "+updateBenef.amnt)
    
})


app.listen('3030',()=>{
    console.log(`Connected to server :3030`);
})

