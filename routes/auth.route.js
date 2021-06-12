const {Router} = require('express');
const router = Router();
const AuthController = require('../controllers/auth.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {check} = require('express-validator');

router.post(
    '/signup',
    [
        check('email', 'Некоректний email').isEmail(),
        check('password', 'Мінімальна довжина пароля 5 символів').isLength({min: 5})
    ],
    AuthController.signUp
)

router.post(
    '/signin',
    [
        check('email', 'Некоректний email').isEmail(),
        check('password', 'Мінімальна довжина пароля 5 символів').isLength({min: 5})
    ],
    AuthController.signIn
)

router.get(
    '/authstatechange',
    AuthMiddleware,
    AuthController.authStateChanged
)

module.exports = router