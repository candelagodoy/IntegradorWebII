const { Router } = require('express');
const { selec } = require('../controllers/home');

const router = Router();

router.get('/', selec);




module.exports = router; 