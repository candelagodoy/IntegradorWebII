const { Router } = require('express');
const { index, busqueda,imagenesAdicionales,paginado } = require('../controllers/home');

const router = Router();



router.get('/', index)
router.get('/paginado',paginado)
router.get('/detalles/:id',imagenesAdicionales)

router.post('/submit',busqueda)



module.exports = router; 