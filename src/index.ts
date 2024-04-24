require('dotenv').config();

const multer = require('multer');
const express = require('express');
const { storage } = require('./utils/multerConfig');
const app = express();
const port = process.env.PORT || 3000;
const { prisma } = require('./database/prisma');

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req: any, res: any) => {
  res.json({ message: 'Arquivo enviado com sucesso', file: req.file.filename });
});

app.post('/user', async (req: any, res: any) => {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "xxxxx@xxxxxx",
      password: "xxxxxx",
    },
  });

  res.status(201).json(user);
});

app.listen(port, async () => {
  await prisma.$connect();

  console.log(`servidor está rodando na porta ${port}`)
});

module.exports = app;
