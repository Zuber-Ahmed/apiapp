const mongoose = require("mongoose");

const bankModel = mongoose.model("banks", {
  name: { type: String },
  branch: { type: String },
  city: { type: String },
});

module.exports=bankModel;