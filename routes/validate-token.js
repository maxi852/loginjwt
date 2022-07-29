const jwt = require('jsonwebtoken')


// middleware para validar el token (rutas protegidas)
//en postman poner el token en el header para validar auth-token:".."
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token') //agara el token creado a traves del header para verificarlo posteriormente
    if (!token) return res.status(401).json({ error: 'Acceso denegado' })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)//hace la verificacion del token y si esta bien te deja avanzar a la pagina donde se este utilizando
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
}

module.exports = verifyToken;