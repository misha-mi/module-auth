const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const chatController = require('../controllers/chat-controller');
const messageController = require('../controllers/message-controller');
const filesConroller = require('../controllers/files-controller');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  body('name').isString(),
  body('surname').isString(),
  body('patronymic').isString(),
  userController.registration,
);
router.post(
  '/registrationTeacher',
  authMiddleware,
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  body('name').isString(),
  body('surname').isString(),
  body('patronymic').isString(),
  userController.registraionTeacher,
);
router.post('/login', userController.login);
router.post('/confirm', userController.confirmAccess);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh); // не протестирована
router.get('/teachers', authMiddleware, userController.getAllTeachers);
router.post('/user', authMiddleware, userController.getUser);

router.post('/findChat', authMiddleware, chatController.findChat);
router.get('/getChats', authMiddleware, chatController.findUserChats);
router.post('/createMessage', authMiddleware, messageController.createMessage);
router.get('/getMessages/:chatId', authMiddleware, messageController.getMessages);

router.post('/createDir', authMiddleware, filesConroller.createDir);
router.get('/getFiles/:parent', authMiddleware, filesConroller.findFiles);
router.post('/uploadFile', authMiddleware, filesConroller.uploadFile);
router.get('/downloadFile/:id', authMiddleware, filesConroller.downloadFile);
router.delete('/deleteFile/:id', authMiddleware, filesConroller.deleteFile);
module.exports = router;
