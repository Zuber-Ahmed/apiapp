const mongoose = require("mongoose");

const ConnectDB = () => {
  const db = "mongodb://127.0.0.1/empdata";
  mongoose.connect(db).then(() => console.log(`Connected to ${db}`)).catch((err)=>console.log(err));
};
module.exports=ConnectDB;

