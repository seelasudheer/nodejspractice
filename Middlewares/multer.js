const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename:function(req,file,cb){
        console.log(file);
        cb(null,file.originalname)
    }
})
var upload = multer({ storage: fileStorageEngine })

module.exports=upload