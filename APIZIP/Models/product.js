const mongoose=require('mongoose')

const products=mongoose.model("product",{
    id:{type: Number},
    price:{type: Number}

});

module.exports=products