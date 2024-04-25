import { Router } from 'express';
const UserController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

const router = Router();

router.use(authenticate);

router
  .post('/user', UserController.createUser)
  .get('/user', UserController.getAllUsers)
  .get('/user/:id', UserController.getUserById)
  .put('/user/:id', UserController.updateUser)
  .delete('/user/:id', UserController.deleteUser);

module.exports = router;
