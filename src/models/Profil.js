const mongoose = require('mongoose');

const profilSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
},{timestamps:true});

const profil = mongoose.model('Profil',profilSchema);
module.exports = profil