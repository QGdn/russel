const express = require('express');
const router = express.Router();

const service = require('../services/users');

const private = require('../middlewares/private');

/* GET users listing. */
router.get('/:id', private.checkJWT, service.getById);
router.put('/add', service.add);
router.patch('/:id', private.checkJWT, service.update);
router.delete('/:id', private.checkJWT, service.delete);
router.post('/login', service.authenticate);
router.get('/logout', service.logout);

module.exports = router;