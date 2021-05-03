const app = require('express')();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const routesUser = require('./routes/user');

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

// ROUTES
app.use('/api', routesUser);

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening to port ${port}`))