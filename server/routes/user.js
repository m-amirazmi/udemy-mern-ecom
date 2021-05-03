const router = require('express').Router();
const { signup, signin, signout, requireSignin } = require('../controllers/user');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/hello', requireSignin, (req, res) => {
    res.send('Hello There!');
})

module.exports = router;
