import { Router } from 'express';
const UserController = require('../controllers/userController');
const authenticate = require('../middleware/authenticate');

const router = Router();

router.use(authenticate);

router
  .get('/user', UserController.getAllUsers)
  .get('/user/inactive', UserController.getAllUsersInactive)
  .get('/user/:id', UserController.getUserById)
  .put('/user/:id', UserController.updateUser)
  .delete('/user/:id', UserController.deleteUser);

module.exports = router;
