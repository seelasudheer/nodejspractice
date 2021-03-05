const mongoose=require('mongoose')

const Schema=mongoose.Schema

const recordSchema=new Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,required:true},
    address:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    phonenumber:{type:Number,required:true},
    userid:{type:Schema.Types.ObjectId,ref:'User'}
},{timestamps:true})

const Record=mongoose.model('Records',recordSchema)

module.exports=Record