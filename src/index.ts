require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const { prisma } = require('./controllers/prismaController');

const port = process.env.PORT || 3000;
const app = express();

routes(app)

app.listen(port, async () => {
  await prisma.$connect();
  
  console.log('banco de dados conectado')
  console.log(`servidor está rodando na porta ${port}`)
});

module.exports = app;
