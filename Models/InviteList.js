const mongoose=require('mongoose')

const Schema=mongoose.Schema

const inviteSchema=new Schema({
    sourceId:{type:Schema.Types.ObjectId,ref:'User',required:true},
    email:{type:String,required:true},
    status:{type:String},
    referalCode:{type:String}
},{timestamps:true})

const InviteSchema=mongoose.model('inviteList',inviteSchema)
module.exports=InviteSchema