const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:[6,'password must be at least 6 characters long'],
        maxLenght:[200,'password must be at max 10 characters long'],
    },
    role:{
        type:String,
        enum:['superadmin','admin','user'],
        default:'user'
    },

    //stocher les actions de l'utilisateurs
    isActive:[{
        type:Boolean,
        default:false
    }],
},{timestamps:true});

UserSchema.methods.setAction = function(action){
    this.actions.push(action);
    return this.save();
}

UserSchema.methods.getAction = function(){
    return this.actions;
}
const user = mongoose.model('User',UserSchema);
module.exports = user
