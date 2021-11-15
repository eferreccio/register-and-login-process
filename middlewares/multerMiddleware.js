const express = require('express');
const router = express.Router();


const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname,'../public/images/avatars'));
    },
    filename: function(req, file, cb){
        let fileName = file.originalname;
        cb(null, fileName);
    }
})

const upload = multer({ storage });

module.exports = upload;