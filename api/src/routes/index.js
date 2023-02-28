const { Router } = require('express');
const router = Router();
const videogames = require('./server.js')
const genres = require('./genrerouter.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videogames)
router.use('/genres', genres)



module.exports = router;
