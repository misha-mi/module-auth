const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const chatController = require('../controllers/chat-controller');
const messageController = require('../controllers/message-controller');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration,
);
router.post('/login', userController.login);
router.post('/confirm', userController.confirmAccess);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh); // не протестирована
router.get('/users', authMiddleware, userController.getUsers);
router.post('/user', authMiddleware, userController.getUser);
router.post('/findChat', authMiddleware, chatController.findChat);
router.get('/getChats', authMiddleware, chatController.findUserChats);
router.post('/createMessage', authMiddleware, messageController.createMessage);
router.get('/getMessages/:chatId', authMiddleware, messageController.getMessages);

module.exports = router;
