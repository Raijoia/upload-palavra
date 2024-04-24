import { Router } from 'express';
const multer = require('multer');
const FileController = require('../controllers/fileController');
import { storage } from '../controllers/multerController';


const upload = multer({ storage });
const router = Router();

router.post('/upload', upload.single('file'), FileController.uploadFile);

module.exports = router;
