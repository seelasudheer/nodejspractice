const express=require('express')
const mongoose=require('mongoose')
const userRouter=require('./Routes/userRouter')
const dataRouter=require('./Routes/dataRouter')
const utilRouter= require('./Routes/getInfo')

const app=express()
mongoose.connect('mongodb://localhost:27017/finaldb',{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection

db.on('error',(err)=>{
    console.log(err,"cool");
})
db.once('connected',()=>{
    console.log("connected successfully");
})


app.use(express.json())
app.use('/record',dataRouter)
app.use('/api',utilRouter)
app.use('/',userRouter)

app.listen(3002,()=>{
 console.log("server is running on port");
})