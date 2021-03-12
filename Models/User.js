const mongoose=require('mongoose')

const Schema=mongoose.Schema

const UserSchema=new Schema({
    name:{type:String},
    email:{type:String, unique: true},
    password:{type:String},
    secret:{type:String},
    role:{type:String},
    inviteCode:{type:String}
})

const userSchema=mongoose.model('User',UserSchema)
module.exports=userSchema