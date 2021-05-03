const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
    const { body } = req;

    const user = new User(body);
    user.save((err, user) => {
        if (err) return res.status(400).json({ error: errorHandler(err) });

        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({ user });
    })
}

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;

    User.findOne({ email }, (err, user) => {
        if (err || !user) return res.status(400).json({ error: 'User not exists!' });
        if (!user.authenticate(password)) return res.status(401).json({ error: 'Email and password not match!' });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.cookie('t', token, { expire: new Date() + 9999 });

        const { _id, name, email, role } = user
        return res.json({ token, user: { _id, name, email, role } })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Successfully Signout' });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {
    const user = req.profile && req.auth && req.profile._id.toString() === req.auth._id.toString();
    console.log(user, req.profile._id, req.auth._id)
    if (!user) return res.status(403).json({ error: 'Access Denied!' });
    next();
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) return res.status(403).json({ error: 'Admin resources! Access Denied!' });
    next();
}