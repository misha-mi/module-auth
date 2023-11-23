require('dotenv').config();

const { PrismaClient } = require('@prisma/client');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');
const { Server } = require('socket.io');
const { createServer } = require('node:http');

const PORT = process.env.PORT || 5000;
const app = express();
const prisma = new PrismaClient();
const server = createServer(app);
const io = new Server(server, { cors: 'http://localhost:3000' });

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/auth-api', router);
app.use(errorMiddleware);

let onlineUser = [];

io.on('connection', (socket) => {
  socket.on('addNewUser', (userId) => {
    console.log(userId);
    !onlineUser.some((user) => user.userId === userId) &&
      onlineUser.push({
        userId,
        socketId: socket.id,
      });
  });

  socket.on('getOnlineUsers', () => {
    io.emit('getOnlineUsers', onlineUser);
  });

  socket.on('sendMessage', (message) => {
    const user = onlineUser.find((user) => user.userId === message.userId);
    if (user) {
      io.to(user.socketId).emit('sendMessage', message);
    }
  });

  socket.on('disconnect', () => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socket.id);
    io.emit('getOnlineUsers', onlineUser);
  });
});

const start = async () => {
  try {
    await prisma.$connect();
    // app.listen(PORT, () => console.log(`Сервер запущен на PORT = ${PORT}`));
    server.listen(PORT, () => {
      console.log(`Сервер запущен на PORT = ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
