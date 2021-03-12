const express=require('express')
const router=express.Router()
const util=require('../Contollers/citiesController')
const upload = require('../Middlewares/multer')
const { jswtVerify } = require('../Middlewares/verifyToken')

router.get('/cities',util.cities)
router.post('/sendmail',jswtVerify,util.sendMail)
router.post('/getFile',util.getFile)
router.get('/getInviteList/:id',jswtVerify,upload.none(),util.getInviteList)

module.exports=router