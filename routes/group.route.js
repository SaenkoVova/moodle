const {Router} = require('express');
const router = Router();
const GroupController = require('../controllers/group.controller')

const AuthMiddleware = require('../middlewares/auth.middleware');

router.post(
    '/create_group',
    AuthMiddleware,
    GroupController.createGroup
)


module.exports = router
