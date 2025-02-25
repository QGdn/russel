var express = require('express');
var router = express.Router();

const userRoute = require('../routes/users');
const dashboardRoute = require('../routes/dashboard');
const catwaysRoute = require('../routes/catways');

const private = require('../middlewares/private');
const service = require('../services/users');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index');
});

router.use('/users', private.checkJWT, userRoute);
router.use('/dashboard', private.checkJWT, dashboardRoute);
router.use('/catways', private.checkJWT, catwaysRoute);

router.post('/login', service.authenticate);
router.post('/logout', service.logout);


module.exports = router;
