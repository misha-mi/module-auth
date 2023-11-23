const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

class MessageService {
  async createMessage(chatId, senderId, text) {
    const chat = await client.chat.findFirst({
      // проверка на принадлежность к чату
      where: {
        OR: [
          { id: chatId, firstUserId: senderId },
          { id: chatId, secondUserId: senderId },
        ],
      },
    });

    if (!chat) {
      return chat;
    }

    const date = new Date();

    const message = await client.message.create({ data: { chatId, senderId, text, date } });

    return message;
  }

  async getMessages(chatId, userId) {
    const chat = await client.chat.findFirst({
      // проверка на принадлежность к чату
      where: {
        OR: [
          { id: chatId, firstUserId: userId },
          { id: chatId, secondUserId: userId },
        ],
      },
    });

    if (!chat) {
      return chat;
    }
    const message = await client.message.findMany({ where: { chatId } });

    return message;
  }
}

module.exports = new MessageService();
