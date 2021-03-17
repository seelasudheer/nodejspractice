const express=require('express')
const Record =require('../Contollers/dataController')
const RecordModel =require('../Models/Data')
const { jswtVerify } = require('../Middlewares/verifyToken')

const router=express.Router()
const upload=require('../Middlewares/multer')
const pagination=require('../Middlewares/pagination')

router.post('/addRecord',jswtVerify,upload.single('image'),Record.addRecord);
router.get('/getRecords',jswtVerify,pagination(RecordModel),Record.getRecord)
router.delete('/deleteRecord',jswtVerify,upload.none(),Record.deleteRecord)
router.post('/getUserId',jswtVerify,upload.none(),pagination(RecordModel),Record.getByUserId);

router
.route('/showRecord/:id')
.post(jswtVerify,upload.none(),Record.showOneRecord)
.put(jswtVerify,upload.single('image'),Record.updateRecord)



module.exports=router