var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('dashboard');
});

module.exports = router;
