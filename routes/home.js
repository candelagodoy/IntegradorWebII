const { Router } = require('express');
const { selec, test, busqueda,imagenesAdicionales,paginado } = require('../controllers/home');

const router = Router();



router.get('/', test)
router.get('/detalles/:id',imagenesAdicionales)

router.post('/submit',busqueda)





module.exports = router; 