const { Router } = require('express');
const AuthController = require('../controllers/authController');

const router = Router();

router
  .post('/auth', AuthController.login)
  .post('/register', AuthController.register);

module.exports = router;
