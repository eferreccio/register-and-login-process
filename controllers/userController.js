const bcryptjs = require('bcryptjs');
const { validationResult }= require('express-validator');
const { ResultWithContext } = require('express-validator/src/chain');

const User = require('../models/Users')

const controller = {
    register: function(req, res){
        res.render('userRegisterForm.ejs')

    },
    processRegister: function(req, res){
        const resultValidation = validationResult(req);


        if (resultValidation.errors.length > 0){
            return res.render('userRegisterForm', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let userInDb = User.findByField('email', req.body.email);

        if (userInDb) {
            return res.render('userRegisterForm', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }                    
                },
                oldData: req.body
            });
        }       

        let userToCreate = {
          ...req.body,
          password: bcryptjs.hashSync(req.body.password, 10),
          avatar: req.file.filename
        }
        
        let userCreated = User.create(userToCreate);

        return res.redirect('/user/login')

    },
    login: function(req, res){
        res.render('userLoginForm');

    },
    loginProcess: function(req, res){
        let userToLogin = User.findByField('email', req.body.email);
        
        if (userToLogin) {
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password)
            if (isOkThePassword) {
                delete userToLogin.password;
                req.session.userLogged = userToLogin //si todo esta bien, antes de redirigir a profile, quiero guardar el usuario en session
                return res.redirect('/user/profile')
            }
        }
        return res.render('userLoginForm', {
            errors: {
                email: {
                    msg: 'Las credenciales son inválidas'
                }
            }
        })

    },
    profile: function(req, res){
        return res.render('userProfile',{
            user: req.session.userLogged
        });
    },
    logout: function(req, res){
        req.session.destroy(); // Este método borra cualquier cosa que esté en session
        return res.redirect('/');
    }
}

module.exports = controller;