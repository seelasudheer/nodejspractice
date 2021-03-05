
const Record=require('../Models/Data')
const User =require('../Models/User')

//get Records
const getRecord=(req,res,next)=>{
    Record.find().
    then(resp=>{
        res.send(resp)
    }).catch(err=>{
        console.log(err);
    })
}

// add Record
const addRecord=async(req,res,next)=>{
      let record=new Record({
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        phonenumber:req.body.phonenumber,
        email:req.body.email,
        userid:req.body.userid
      })
      try{
     let data=await User.find({email:req.body.email})
        console.log(data,"coooo9999999900000000000");
        if(data.length==0){
      await record.save()
      .then(resp=>{
          res.send(resp)
      }).catch(err=>{
          console.log("fer",err);
          if(Object.keys(err.keyValue)>0)
        res.send({message:"Email Already Exist"})
        else{
            res.send(err)
        }
      })
    }else{
        res.send({message:"Email Already Exist"})
    }
    }catch(err){
        console.log(err);
    }
}

//show one Record 
const showOneRecord=async(req,res,next)=>{
    try{
        // console.log(req);
    let id=req.params.id
    console.log(id);
   let data=await Record.findById(id)
   console.log(data);
   if(data){
       res.send(data)
   }else{
       res.json({status:"No Redcord Found"})
   }
    }catch(err){
 console.log(err,"showErro");
 res.send(err)
    }
    // .then(resp=>{
    //     res.send(resp)
    // }).catch(err=>{
    //     console.log(err);
    // })

}

//update record
const updateRecord=async(req,res,next)=>{
    let id=req.params.id
    let userData={
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        phonenumber:req.body.phonenumber,
        email:req.body.email
    }
     try{
  let data=await Record.findByIdAndUpdate(id,{$set:userData},{new :true})
  if(data){
    res.json({data:data,status:'Updated Sucessfully'})
  }else{
    res.json({status:"Id not found"})
  }
     }catch(Error){
           res.json({Error})
     }
}


//delete Record

const deleteRecord=async(req,res,next)=>{
    try{
    let id=req.body.id
    let data=await Record.findByIdAndRemove(id)
     if(data){
        res.json({status:"Deleted SuccessFully"})
     }
    }catch(err){
res.json(err)
    }
 
    
}

module.exports={
    addRecord,
    getRecord,
    showOneRecord,
    updateRecord,
    deleteRecord
}