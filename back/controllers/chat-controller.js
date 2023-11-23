const chatService = require('../service/chat-service');

class ChatController {
  async findChat(req, res, next) {
    try {
      const { secondId } = req.body;
      let chat = await chatService.findChat(req.user.id, secondId);

      if (chat) {
        return res.json(chat);
      }

      chat = await chatService.createChat(req.user.id, secondId);

      return res.json(chat);
    } catch (e) {
      next(e);
    }
  }

  async findUserChats(req, res, next) {
    const userId = req.user.id;
    try {
      const chats = await chatService.getUserChats(userId);

      return res.json({ chats });
    } catch {
      next(e);
    }
  }
}

module.exports = new ChatController();
