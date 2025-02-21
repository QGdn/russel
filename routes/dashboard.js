var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('dashboard');
});

router.use('/login', userRoute);

module.exports = router;
