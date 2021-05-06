const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

const routesAuth = require('./routes/auth');
const routesUser = require('./routes/user');
const routeCategory = require('./routes/category');

// DBS
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected!'));

// MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// ROUTES
app.use('/api', routesAuth);
app.use('/api', routesUser);
app.use('/api', routeCategory);


const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening to port ${port}`))