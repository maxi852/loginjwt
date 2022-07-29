const router = require('express').Router();

//pagina que carga si se comprueba el token
//para probar en postman poner en header auth-token:el token
router.get('/', (req, res) => {
    res.json({
        data: {
            title: 'mi ruta protegida',
            user: req.user
        }
    })
})

module.exports = router