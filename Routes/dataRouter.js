const express=require('express')
const Record =require('../Contollers/dataController')
const { jswtVerify } = require('../Middlewares/verifyToken')

const router=express.Router()
const upload=require('../Middlewares/multer')


router.post('/addRecord',jswtVerify,upload.single('image'),Record.addRecord);
router.get('/getRecords',jswtVerify,Record.getRecord)
router.delete('/deleteRecord',jswtVerify,Record.deleteRecord)
router.post('/getUserId',jswtVerify,upload.none(),Record.getByUserId);

router
.route('/showRecord/:id')
.post(jswtVerify,upload.none(),Record.showOneRecord)
.put(jswtVerify,upload.single('image'),Record.updateRecord)


module.exports=router