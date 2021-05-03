const router = require('express').Router();
const { signup } = require('../controllers/user');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);

module.exports = router;
