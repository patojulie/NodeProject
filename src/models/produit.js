const mongoose = require('mongoose');

const julieProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    price:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:String,
        required:true,
        enum:['sdufhr','efuirh']
    },
    quantity:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        required:true
    }
},{timestamps:true});

const products = mongoose.model("product",julieProductSchema);
module.exports = products