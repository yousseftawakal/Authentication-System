const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);

router.get('/users', userController.protect, userController.getAllUsers);

router
  .route('/users/:id')
  .get(userController.protect, userController.getUser)
  .patch(userController.protect, userController.updateUser)
  .delete(userController.protect, userController.deleteUser);

module.exports = router;
