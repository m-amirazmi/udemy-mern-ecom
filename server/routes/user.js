const router = require('express').Router();
const { sayHi } = require('../controllers/user');

router.get('/', sayHi);

module.exports = router;
