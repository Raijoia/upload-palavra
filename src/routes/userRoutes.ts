const { Router } = require('express');
const UserController = require('../controllers/userController');

const router = Router();

router
  .post('/user', UserController.createUser)

module.exports = router;
