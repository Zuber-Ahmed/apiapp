const express = require("express");
const cors = require("cors");
const app = express();
const ConnectDB = require("./db");
const empModel = require("./Models/empModel");
const todoModel = require("./Models/todoModel");
const products = require("./Models/product");

app.use(cors());
app.use(express.json());



app.get("/", (req, res) => {
  res.send("Welcome to home page");
});

app.get("/home", (req, res) => {
  res.send("Welcome to main content..");
});

app.get("/department", (req, res) => {
  res.send(" I belong to a Management Dept. ");
});

app.get("/getage", (req, res) => {
  res.send("20");
});

app.get("/person", (req, res) => {
  const obj = {
    name: "Zuber Ahmed",
    email: "zzz@gmail.com",
    mobile: 888888888,
    city: "Nanded",
  };
  res.send(obj);
});

// app.get('/empdata',(req,res)=>{
//     ConnectDB();
//     const emp=["Zuber","Sam","Maria","Ahmed","Devid","Amit","John","Irfan","Sagheer"];
//     res.send(emp)
// })

app.get("/emp", (req, res) => {
  ConnectDB();
  empModel.find({}, (err, doc) => {
    res.send(doc);
  });
});

app.get("/mytodo", async (req, res) => {
  ConnectDB();
  const result = await todoModel.find({ id: 10 });
  res.json(result);
});

app.get("/products", async (req, res) => {
  ConnectDB();
  const result = await products.find({ price: 109 });
  res.json(result);
});

app.listen(5050, () => {
  console.log("Server is up and running.");
});
