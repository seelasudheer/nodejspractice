const UserModel=require('../Models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const roles=["Admin","Manager","Employee"]

const signUp=(req,res,next)=>{
    // user
    console.log(req.body,"cool",roles.includes(req.body.role));
    if(!roles.includes(req.body.role)){
        return res.json({message:"Please Select valid Role"})
    }
    bcrypt.hash(req.body.password,10,async function(err,hashedPass){
             if(err){
                 res.json({error:err})
             }
             let user=new UserModel({
                     name:req.body.name,
                     email:req.body.email,
                     secret:req.body.password,
                     password:hashedPass,
                     role:req.body.role
             })
             try{
            let data= await user.save()
            if(data){
             res.json({data:data,status:"created successfully"})
            }
             }catch(err){
                //  console.log(err);
                 if(err && err.keyValue)
                 res.send({err,status:"Email Already Exist"})
             }
    })
}
        
const LogIn=async(req,res,next)=>{
    console.log(req.body,"coooooooooooool");
    // const form = formidable({ multiples: true });
 
    // form.parse(req, (err, fields, files) => {
    // if(err)
    // console.log(err);
    // else{
    // console.log(fields);
    //   res.send({ fields }, null, 2);
    // }
    // });
    let email=req.body.email
    let password=req.body.password
    try{
    let data=await UserModel.findOne({$or:[{email:email}]}).select('email password');
     console.log(data,"poppyyyy");
    if(data){
        bcrypt.compare(password,data.password,(err,result)=>{
            if(err){
                console.log(err,"loginError");
               return res.send(err)
            }
            if(result){
             let token=jwt.sign({name:data.name},'secretpoppy',{expiresIn:'1h'})
             if(token){
                 console.log(token);
                 return res.json({
                     status:"Log in Successfully",
                     token,
                     data
                 })
             }
            }else{
               return res.json({
                    message:"password mismatch",
                })
            }
        })
    }else{
        res.json({status:"Invalid Email"})
    }
    }catch(err){
         return console.log(err);
    }
}
// list users
const  getUsers=async (req,res,body)=>{
          try{
             let data=await UserModel.find().select('name email')
             if(data){res.json({data:data})}
          }catch(err){
              console.log(err);
              res.json({err:err})
          }
}

const deleteUser=async(req,res,next)=>{
    try{
    let id=req.body.id
    let data=await UserModel.findByIdAndRemove(id)
    console.log(data);
     if(data){
         return res.json({status:"Deleted successfully"})
     }
     if(data==null){
        res.json({status:"No Id Found "})
     }else{

     }
    }catch(err){
        console.log(err,"err");
       return res.json({err:err,status:"Invalid Id"})
    }
}

const showUser=async(req,res,next)=>{
    try{
         let id=req.body.id
  let data=await UserModel.findById(id)
         if(data){
             console.log(data);
         res.send(data)
         }else{
            res.send("No Id")
         }
        }catch(err){
            res.send(err)
        } 
}

const getRoles=(req,res,next)=>{
    res.send(roles)
}


module.exports={
    signUp,
    LogIn,
    getUsers,
    deleteUser,
    showUser,
    getRoles,
    
}