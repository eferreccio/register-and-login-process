const express = require('express');
const router = express.Router();

//Controller

const usersController = require('../controllers/userController');

//Middlewares

const uploadFile = require('../middlewares/multerMiddleware');
const validations = require('../middlewares/validateRegisterMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

//Formulario de Registro

router.get('/register', guestMiddleware , usersController.register);

//Procesar el Registro

router.post('/register', uploadFile.single('avatar'), validations ,usersController.processRegister);

//Formulario de Login

//MIN 01:16:48

router.get('/login', guestMiddleware , usersController.login);

//Procesar el Login

router.post('/login', usersController.loginProcess);

//Perfil de Usuario

router.get('/profile/', authMiddleware , usersController.profile);

//Logout

router.get('/logout/', usersController.logout);

module.exports = router;

