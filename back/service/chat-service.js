const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

class ChatService {
  async findChat(firstUserId, secondUserId) {
    const chat = await client.chat.findFirst({
      where: {
        OR: [
          { firstUserId, secondUserId },
          { firstUserId: secondUserId, secondUserId: firstUserId },
        ],
      },
    });

    return chat;
  }

  async createChat(firstUserId, secondUserId) {
    const chat = await client.chat.create({ data: { firstUserId, secondUserId } });

    return chat;
  }

  async getUserChats(userId) {
    const chats = await client.chat.findMany({
      where: { OR: [{ firstUserId: userId }, { secondUserId: userId }] },
    });

    return chats.map(({ id, firstUserId, secondUserId }) => {
      return {
        id,
        userId: userId === firstUserId ? secondUserId : firstUserId,
      };
    });
  }
}

module.exports = new ChatService();
