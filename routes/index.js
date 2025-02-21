var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const dashboardRoute = require('../routes/dashboard');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index');
});

router.use('/login', userRoute);
router.use('/dashboard', dashboardRoute);

module.exports = router;
