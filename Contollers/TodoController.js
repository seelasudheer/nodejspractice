
const todoModel=require('../Models/Todo')
const userModel=require('../Models/User')

const getList=async(req,res,next)=>{
    try{
        // let data=await userModel.find({userid:req.body.userid})
        // console.log(data);
        let todo=await todoModel.find()
        // console.log(JSON.parse(todo));
        res.send(todo)
    }catch(err){
        console.log(err);
        res.send(err)
    }
}

const addTodoSave=async(req,res,next)=>{
    try{
  
    console.log("I aM coming",req.body,req.body.userid);
    
    // if(req.body && req.body.todoList){
    //      b=JSON.parse(req.body.todoList)
    //     console.log(req.body,"addTodoSave",b);
    // }
        // console.log(JSON.stringify(req.body.todoList));
        let data=await userModel.find({_id:req.body.userid})
        console.log(data,"hoolio");
        if(data){
            let v=JSON.parse(req.body.todoList)
            console.log(v,"nonenenennen",typeof v);
         let todo=new todoModel({
             todoList:v,
             userid:req.body.userid
         })
         let data=await todo.save()
         console.log(data);
         res.json({data:data})
        }else{
            res.send("Invalid User Id")
        }
    }catch(err){
        console.log(err);
res.send(err)
    }
}


const updateTodo=async(req,res,next)=>{
     try{
         console.log(req.body);
         let info={
             userid:req.body.userid,
             todo:req.body.todo,
             id:req.body.id
         }
    let  data=await todoModel.find({userid: req.body.userid})
    console.log(data,"list");
    if(data){
        res.send({data:data})
    }
     }catch(err){
        console.log(err);
        req.send(err)
     }
}
module.exports={
    addTodoSave,
    getList,
    updateTodo
}