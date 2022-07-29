const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let loginController = {
    register: async (req, res) => {

        //validamos que no haya una cuenta con esa email
        const isEmailExist = await User.findOne({ email: req.body.email });
        if (isEmailExist) {
            return res.status(400).json({error: 'Email ya registrado'})
        }
    
        //encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);
    
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: password
        });
        try {
            const savedUser = await user.save();
            res.json({
                error: null,
                data: savedUser
            })
        } catch (error) {
            res.status(400).json({error})
        }
    },
    login: async (req, res) => {

        //se fija se hay un usuario ya creado con ese mail
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    
        //compara las contraseñas
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
        
        
        //creamos el token con los datos del nombre de usuario y el id
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, process.env.TOKEN_SECRET)//token_secret cadena de caracteres con lo que vos quieras
    
        /* si queres ver el token que se crea en el usuario
        res.header('auth-token', token).json({
            error: null,
            data: {token}
        })*/
    
        res.json({
            data: 'exito bienvenido',
            token: token
        })
    }
}

module.exports = loginController