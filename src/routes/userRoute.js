const userController = require('../controllers/userController.js');
const Router = require('express');

const router = Router();
router.post('/',userController.register);
router.post('/login',userController.login);
router.put('/:id',userController.updateUser);

module.exports = router