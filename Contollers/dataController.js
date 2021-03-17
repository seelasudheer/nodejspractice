const Record=require('../Models/Data')
const User =require('../Models/User')
const fs=require('fs')
//get Records
const getRecord=(req,res,next)=>{
    // res.json({})
    // console.log(res);
    res.send({result:res.paginatedResult.result,count:res.paginatedResult.result.length})
}

// add Record
const addRecord=async(req,res,next)=>{
    let fileType="";
    try{
        let data1=await User.findById(req.body.userid)
 if(!data1){
     console.log(Record,"duplicate");
      res.send({message:"please give valid Source Id"})
    // return res.send({status:data[0].status})
 }

    }catch(err){
          console.log(err);
    }
    console.log("req.body---------------ggggggg",req);
    if(!req.file){
        console.log("No fiLE",req.file);
        res.statusCode =400
        res.json({err:"Upload Image"})
    }else{
         let img=fs.readFileSync(req.file.path)
         let base64=img.toString('base64')
          fileType={
             filename:req.file.originalname,
             contentType:req.file.mimetype,
             imageBase64:base64
         }
    }
      let record=new Record({
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        phonenumber:req.body.phonenumber,
        email:req.body.email,
        userid:req.body.userid,
        image:fileType
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
          if(err){
              console.log("no way");
        res.json({error:err})
          }
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
    console.log(req.body);
    let userData={
        name:req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        address:req.body.address,
        phonenumber:req.body.phonenumber,
        email:req.body.email,
        image:req.file.path,
        imageName:req.file && req.file.originalname
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

//getByUserId Record
const getByUserId=async(req,res,next)=>{
             let userid=req.body.userid
            //  console.log(res);
            res.send({result:res.paginatedResult && res.paginatedResult.result,count:res.paginatedResult && res.paginatedResult.result.length})
}

module.exports={
    addRecord,
    getRecord,
    showOneRecord,
    updateRecord,
    deleteRecord,
    getByUserId
}