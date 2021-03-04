const express=require('express')
const Record =require('../Contollers/dataController')
const { jswtVerify } = require('../Middlewares/verifyToken')

const router=express.Router()

router.post('/addRecord',jswtVerify,Record.addRecord)
router.get('/getRecords',jswtVerify,Record.getRecord)
router.delete('/deleteRecord',jswtVerify,Record.deleteRecord)
router
.route('/showRecord/:id')
.post(jswtVerify,Record.showOneRecord)
.put(jswtVerify,Record.updateRecord)


module.exports=router