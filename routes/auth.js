const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let login = require('../controllers/controllerLogin');

router.post('/register', login.register)

router.post('/login', login.login)

module.exports = router;