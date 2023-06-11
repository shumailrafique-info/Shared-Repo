const mongoose = require('mongoose')
const express = require('express');
const app = express()
const multer = require('multer')
const router = require('../CategoryRoute')



const CategoryModel = require('../../App/Api/Model/CategoryModel')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './Uploads/Category')
    },

    filename: function(req, file, cb){
        cb(null, file.originalname)
    }

})




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

const upload = multer({

    storage: storage,
     limits : {
             fileSize: 1024 * 1024 * 16 // 16MB
     },
     filefilter: fileFilter
 })






router.post('/UpdateCategory/:categoryID', upload.single('file'), (req, res, next) => {

    const {categoryID}  = req.params
 
    const CategoryData = {

        title: req.body.title,
        category: req.body.category,
        sale: req.body.sale,
        price: req.body.price,
        offprice: req.body.offprice,


    }

    if(req.file){
        CategoryData.path = req.file.path,
        CategoryData.name = req.file.filename
    }


    
    CategoryModel.findByIdAndUpdate(categoryID, CategoryData).then(success => {

        res.send('Product Successfully Updated'),
        console.log('this is success', success )
        

    })
    .catch(err => {
        console.log(err)
        res.send('Failed to Update category', err)
    })





  


})
module.exports = router