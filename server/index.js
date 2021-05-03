const app = require('express')();
const mongoose = require('mongoose');
require('dotenv').config();

const routesUser = require('./routes/user');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('DB Connected!'));

app.use('/api', routesUser);

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Listening to port ${port}`))