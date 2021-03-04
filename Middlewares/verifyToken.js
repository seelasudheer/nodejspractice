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
            res.send(err)
        }
       req.userData=result
       console.log(result);
       if(result){
       next();
       }
    })

}
module.exports={
    jswtVerify
}