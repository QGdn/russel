const express = require('express');
const router = express.Router();

const service = require('../services/users');

const private = require('../middlewares/private');

/* GET users listing. */
router.get('/', private.checkJWT, service.getByEmail);
router.get('/:email', private.checkJWT, service.getByEmail);
router.post('/', service.add);
router.put('/:email', service.add);
router.delete('/:email', private.checkJWT, service.delete);
module.exports = router;