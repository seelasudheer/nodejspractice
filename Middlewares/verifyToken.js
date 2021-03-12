//jwt verify
const jwt =require('jsonwebtoken')
const jswtVerify=(req,res,next)=>{
    console.log(req.headers);
    let token=req.headers['authorization']
    // console.log(token);
    let authToken=token
    jwt.verify(authToken,'secretpoppy',(err,result)=>{
        if(err){
            console.log("err",err);
           return res.send(err)
        }
       req.userData=result
       console.log("result-------------",result);
       if(result){
       next();
       } else {
           return res.send({message:"invalid token"})
       }
    })

}
module.exports={
    jswtVerify
}