const path = require('path');
global.__basedir = path.dirname(__dirname);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const notificationsController = require('./controllers/notifications');
const auth=require('./controllers/auth');


mongoose.connect('mongodb://localhost:27017/oes', {useNewUrlParser: true, useCreateIndex: true}, );
// const mongoURI = config.get('mongoURI');

// mongoose.connect(mongoURI, {
//     useNewUrlParser: true, 
//     useCreateIndex: true
// }).then( () => {
//     console.log('Connected to mongo');
// }).catch( error => {
//     console.log(error);
// }) 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const equipements = require('./routes/equipements');
const sites = require('./routes/sites');
const categories = require('./routes/categories');
const equipementsTypes = require('./routes/equipementTypes');
const login=require('./routes/login');
const users = require('./routes/users');

const failures = require('./routes/failures');
const interventions = require('./routes/interventions');
const notifications = require('./routes/notifications');
const morgan = require('morgan');

const port = process.env.PORT || 5000;
app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use('/equipements/types', equipementsTypes);

app.use('/equipements/', equipements);
app.use('/sites/', sites);
app.use('/categories', categories);
app.use('/users/', users);
app.use('/failures/', failures);
app.use('/interventions/', interventions);
app.use('/notifications/', notifications);
app.use('/login/',login);
app.use('/signup',auth.signup)
app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

var server = app.listen(port, () => {
    /* console.log(process.env.PORT) */
    console.log('Example app listening on port port!', port);
});

const io = require('socket.io')(server);

io.sockets.on('connection', socket => {
    console.log('New Client Connected', socket.id);
    socket.on("notification",  notification => { 
        notificationsController.addNotification(notification, io)
    });
});