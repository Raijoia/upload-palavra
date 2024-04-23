require('dotenv').config();

const multer = require('multer');
const express = require('express');
const { storage } = require('./utils/multerConfig');
const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req: any, res: any) => {
  res.json({ message: 'Arquivo enviado com sucesso', file: req.file.filename });
});

app.listen(port, () => console.log(`servidor está rodando na porta ${port}`));

module.exports = app;
