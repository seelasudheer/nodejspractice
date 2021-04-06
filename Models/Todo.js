const mongoose=require('mongoose')

const Schema=mongoose.Schema

const todo=new Schema({
    key:{
        type:String,
    },
    todoList:[{
        todo:{type:String}
    }],
    userid:{type:Schema.Types.ObjectId,ref:'User'}
},{timestamps:true})

const TodoSchema=mongoose.model('todo',todo)

module.exports=TodoSchema