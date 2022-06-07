const { default: mongoose } = require('mongoose');
const mangoose=require('mongoose');

const todoModel=mongoose.model("todo",{

    id:{type: Number},
    title:{type: String}
})

module.exports=todoModel