const express = require('express');
const app = express();

// const fileUpload = require('express-fileupload');
const morgan = require('morgan');
const multer = require('multer');
const cors= require('cors');
// app.use(cors())


const userRouter = require('./Routes/userRouter');
const dataRouter = require('./Routes/dataRouter');
const utilRouter = require('./Routes/getInfo');
const mongoose = require('mongoose')


const upload=multer()
app.use(morgan('dev'))


mongoose.connect('mongodb://localhost:27017/finaldb', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err, "cool");
})
db.once('connected', () => {
    console.log("connected successfully");
})



// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:false}))

// app.use(bodyParser.json())
// app.use(bodyParser.raw({ inflate: true, limit: '10000kb', type: 'image/png' }))


app.use('/record',dataRouter)
app.use('/api',upload.none(),utilRouter)
app.use('/',upload.none(),userRouter)



// app.post('/getFile', upload.single('cool'), (req, res) => {
//     try {
//         console.log(req.file);
//         res.send(req.file)
//     } catch (err) {
//         console.log(err, "888888888888888");
//     }
// });

app.use((req, res, next) => {
    console.log("dhfghdfghdgfhdgfhgjdf");
    const err = new Error("Not Found")
    err.status = 404
    next(err)
});
app.use((err, req, res, next) => {
    console.log("&&&&&&&&&&&&");
    res.status(err.status || 500)
    res.json({
        message: err.message
    });
});

app.use(function (req, res, next) {
    // let origin = req.headers.origin;
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Credentials', true);
    next();
  });



app.listen(3002, () => {
    console.log("server is running on port");
});