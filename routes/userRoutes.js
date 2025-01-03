const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

router.get('/users', userController.getAllUsers);

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router
  .route('/users/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
