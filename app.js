const express = require('express');
const session = require('express-session');
const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session({
    secret: "Shhh, it's a secret",
    resave: false,
    saveUninitialized: false
}));

app.use(userLoggedMiddleware);

app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.listen(process.env.PORT || 3000, function(){
    console.log('server running');
});

//Template engine

app.set('view engine','ejs');

//Routers
const mainRoutes = require('./routes/mainRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/', mainRoutes);
app.use('/user', userRoutes);