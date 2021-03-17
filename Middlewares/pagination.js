
function pagination(model){
    return async(req,res,next)=>{
         console.log(req.query,"req.body",req.body);
        let page=parseInt(req.query.pageNum)
        let size=parseInt(req.query.pageSize)
      

        let sIndex=(page-1)* size
        let lIndex=page* size

        if(!req.body){
     try{
         const result={}
         let data=await model.find().limit(size).skip(sIndex).exec()
         result.result=data
         res.paginatedResult=result
         next();



     }catch(err){
console.log(err);
     }
    }else{
        try{
            const result={}
        //               console.log(page,size,"dummy");
        // console.log(sIndex,lIndex,".sIndex,lIndex",req.body.userid);
        if(size<0)
        size=0
        // if(sIndex==)
            let data=await model.find({'userid':req.body.userid}).limit(size).skip(sIndex).exec()
            result.result=data
            res.paginatedResult=result
            // console.log(data,"coollll");
            next();
   // console.log(data,"modeeel");
   // next()
   
   
        }catch(err){
   console.log(err);
        }
    }
    }
}
module.exports=pagination