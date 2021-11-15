
const express = require('express');
const path = require('path');
const { body } = require('express-validator'); // Tambien podría haber usado { check }

const validations = [
    body('full_name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('last_name').notEmpty().withMessage('Tienes que escribir un apellido'), 
    body('email')
        .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('country').notEmpty().withMessage('Tienes que elegir un país'),
    body('avatar').custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg','.png','.gif'];
        

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error('Las extensiones permitidas son .jpg,.png,.gif');
        }
        return true;
        }
    })
];

module.exports = validations;