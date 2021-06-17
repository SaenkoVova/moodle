const {Router} = require('express');
const router = Router();
const AuthController = require('../controllers/auth.controller');
const {check} = require('express-validator');

router.post(
    '/signin',
    [
        check('email', 'Некоректний email').isEmail(),
        check('password', 'Мінімальна довжина пароля 5 символів').isLength({min: 5})
    ],
    AuthController.signIn
)

module.exports = router
