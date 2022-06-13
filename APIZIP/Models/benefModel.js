const mongoose = require("mongoose");

const benefModel = mongoose.model("beneficiaries", {
  accno: { type: Number },
  bankname: { type: String },
  branchname: { type: String },
  amnt: { type: Number },
  bname: { type: String },
  isActive: { type: Boolean },
});

module.exports = benefModel;
