const { errorHandler } = require('../helpers/dbErrorHandler');
const User = require('../models/user');


exports.signup = (req, res) => {
    const { body } = req

    const user = new User(body);
    user.save((err, user) => {
        if (err) return res.status(400).json({ err: errorHandler(err) });
        
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({ user });
    })
}