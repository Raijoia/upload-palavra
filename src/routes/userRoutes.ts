import { Router } from 'express';
const UserController = require('../controllers/userController');

const router = Router();

router
  .post('/user', UserController.createUser)
  .get('/user', UserController.getAllUsers)
  .get('/user/:id', UserController.getUserById)
  .put('/user/:id', UserController.updateUser)
  .delete('/user/:id', UserController.deleteUser);

module.exports = router;
