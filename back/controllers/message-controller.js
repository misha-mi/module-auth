const messageService = require('../service/message-service');

class MessageController {
  async createMessage(req, res, next) {
    try {
      const userId = req.user.id;
      const { chatId, text } = req.body;
      const result = await messageService.createMessage(chatId, userId, text);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async getMessages(req, res, next) {
    try {
      const userId = req.user.id;
      const { chatId } = req.params;
      const result = await messageService.getMessages(chatId, userId);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new MessageController();
