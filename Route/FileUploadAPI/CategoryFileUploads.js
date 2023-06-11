const mongoose = require('mongoose');
const express = require('express');
const app = express()
const multer = require('multer');
const MongoClient = require('mongodb').MongoClient;

const router = require('../CategoryRoute');
const CategoryModel = require('../../App/Api/Model/CategoryModel')


// Storage function 
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './Uploads/Category')
    },

    filename: function(req, file, cb){
        cb(null, file.originalname)
    }

})


// Filter is a Funcion For Defining a  image type
const fileFilter = (req, file, cb) =>{

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mp3' || file.mimetype === 'video/mp4'
     || file.mimetype === 'audio/ogg' || file.mimetype === 'audio/x-m4a' || file.mimetype === 'application/octet-stream'
     || file.mimetype === 'application/pdf'){

        cb(null, true)
     }

     else{
        cb(null, false)
     }
};

// Upload is function as a Middleware and it take two more Functiokn storage and Filefilter
const upload = multer({

    storage: storage,
    limits: {

        fileSize: 1024 * 1024 * 16 //16MB
    },

    fileFilter: fileFilter

})

router.post('/', upload.single('file'), (req, res, next) =>{

    console.log("This is a body", req.body) 
    const Category = new CategoryModel({
        _id: new mongoose.Types.ObjectId(),

        id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        sale: req.body.sale,
        price: req.body.price,
        offprice: req.body.offprice,
    

    });

    if(req.file){
        Category.path = req.file.path,
        Category.name = req.file.filename
    }

    Category.save().then(results =>{

        console.log(results)
        res.send("Product Successfully added")

    })

});


module.exports = router




// const mongoose = require('mongoose')
// const express = require('express')
// const app = express();
// const router = express.Router()
// const MongoClient = require('mongodb').MongoClient;

// const multer = require('multer')
// const CategoryModel = require('../../App/Api/Model/CategoryModel');
// // This is Code torage function setting a file path
// const storage = multer.diskStorage({
//     destination: function (res, file, cb) {
//         cb(null, 'Uploads');
//     },
//     filename: function (res, file, cb) {
//         cb(null, file.originalname)
//     }

// });


// // Filter Function For Defining a image type
// const fileFilter = (req, file, cb) => {

//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'audio/mp3' || file.mimetype === 'video/mp4'
//         || file.mimetype === 'audio/ogg' || file.mimetype === 'audio/x-m4a' || file.mimetype === 'application/octet-stream'
//         || file.mimetype === 'application/pdf') {

//         cb(null, true)
//     }

//     else {
//         cb(null, false)
//     }
// };


// const upload = multer({
//     storage: storage,
//     // Defining the size of an image
//     limits: {
//         fileSize: 1024 * 1024 * 16 //16MB
//     },
//     fileFilter: fileFilter

// });










// router.post('/', upload.single('file'), (req, res, next) => {

//     // if(req.file.mimetype=="image/png" || req.file.mimetype=="image/jpeg" || req.file.mimetype=="image/jpg"){

//     console.log(req.body)
//     const Categroy = new CategoryModel({
        
//         _id: new mongoose.Types.ObjectId(),
//         id: req.body.id,
//         title: req.body.title,
//         category: req.body.category,
//         sale: req.body.sale,
//         price: req.body.price,
//         offprice: req.body.offprice,
//         name: req.file.filename,
//         path: req.file.path,
//     });


//     Categroy.save().then(result => {
//         console.log(result);
//         res.send("Product Successfully added");
//     })


// });




// module.exports = router;




