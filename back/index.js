require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

const PORT = process.env.PORT || 5000;
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/auth-api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => console.log(`Сервер запущен на PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
