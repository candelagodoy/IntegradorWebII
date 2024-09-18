const { Router } = require('express');
const { consulta } = require('../controllers/home');

const router = Router();

router.get('/', consulta);




module.exports = router; 