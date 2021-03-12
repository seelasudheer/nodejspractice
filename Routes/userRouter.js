const express=require('express')
const router=express.Router()
const user =require('../Contollers/userController')
const {jswtVerify} =require('../Middlewares/verifyToken')
const upload=require('../Middlewares/multer')


router.post('/signup',user.signUp)
router.post('/login',user.LogIn)
router.get('/userList',user.getUsers)
router.get('/getRoles',user.getRoles)
router.delete('/deleteUser',user.deleteUser)
router.post('/showUser',user.showUser)

module.exports=router