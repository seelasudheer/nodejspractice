const express=require('express')
const router=express.Router()
const util=require('../Contollers/citiesController')

router.get('/cities',util.cities)
router.post('/sendmail',util.sendMail)

module.exports=router