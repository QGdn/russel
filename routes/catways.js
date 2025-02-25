var express = require('express');
var router = express.Router();

const private = require('../middlewares/private');
const catways = require('../services/catways');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('catways');
});

router.get('/:id/reservations', catways.getCatways);
router.get('/:id/reservations/:idReservation', catways.getReservation);
router.post('/:id/reservations', private.checkJWT, catways.addReservation);
router.put('/:id/reservations/', private.checkJWT, catways.updateReservation);
router.delete('/:id/reservations/:idReservation', private.checkJWT, catways.deleteReservation);

module.exports = router;