const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
  async registration(req, res, next) {
    try {
      const errorsValidation = validationResult(req);
      if (!errorsValidation.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errorsValidation.array()));
      }
      const { email, password, name, surname, patronymic } = req.body;
      const result = await userService.registraion(
        email,
        password,
        name,
        surname,
        patronymic,
        'student',
      );
      return res.json('success');
    } catch (e) {
      next(e);
    }
  }

  async registraionTeacher(req, res, next) {
    try {
      console.log(req.user.role);
      if (req.user.role !== 'admin') {
        return next(ApiError.ForbiddenError());
      }
      const errorsValidation = validationResult(req);
      if (!errorsValidation.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errorsValidation.array()));
      }
      if (req.user.role !== 'admin') {
        return next(ApiError.ForbiddenError());
      }
      const { email, password, name, surname, patronymic } = req.body;
      const result = await userService.registraion(
        email,
        password,
        name,
        surname,
        patronymic,
        'teacher',
      );
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async confirmAccess(req, res, next) {
    try {
      const { code, userId, confirmId } = req.body;
      const userData = await userService.confirmAccessByEmaill(confirmId, code, userId);
      res.cookie('refreshToken', userData.refreshToken, {
        // + флаг secure
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token); // ИСПРАВИТЬ, НЕ НАДО ВОЗВРАЩАТЬ ТОКЕН
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const token = await userService.refresh(refreshToken);
      res.cookie('refreshToken', token.refreshToken, {
        // + флаг secure
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async getAllTeachers(req, res, next) {
    try {
      const users = await userService.getAllTeachers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const { userId } = req.body;
      const user = await userService.getUser(userId);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
