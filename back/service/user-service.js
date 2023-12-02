const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

const client = new PrismaClient();

class UserService {
  async registraion(email, password, name, surname, patronymic, role) {
    const condidate = await client.user.findFirst({ where: { email } });
    if (condidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует!`);
    }
    const hashPassword = await bcrypt.hash(password, 3); // вытащить соль в .env
    const activationLink = uuid.v4();

    let user = await client.user.create({
      data: { email, password: hashPassword, activationLink, role },
    });

    if (role === 'student') {
      await client.student.create({
        data: { email, name, surname, patronymic, userId: user.id },
      });
    } else if (role === 'teacher') {
      user = await client.teacher.create({
        data: { email, name, surname, patronymic, userId: user.id },
      });
    }

    await mailService.sendActivateionMail(
      email,
      `${process.env.API_URL}/auth-api/activate/${activationLink}`,
    );

    // const tokens = tokenService.generateTokens({ ...userDto });

    // await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return user;
  }

  async activate(activationLink) {
    const user = await client.user.findFirst({ where: { activationLink } });
    console.log(activationLink, user);
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await client.user.update({ where: { id: user.id }, data: user });
  }

  async login(email, password) {
    const user = await client.user.findFirst({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('Пользователь не был найден');
    }
    const isPasswordEquals = await bcrypt.compare(password, user.password);

    if (!isPasswordEquals) {
      throw ApiError.BadRequest('Некорректный пароль');
    }

    if (!user.isActivated) {
      throw ApiError.BadRequest('Email не подтвержден');
    }

    const randomCode = Math.round(Math.random() * (999999 - 100001) + 100000);
    const confirmData = await client.confirmCode.create({
      data: { confirmCode: randomCode, userId: user.id },
    });
    await mailService.sendConfirmCode(user.email, randomCode);

    return {
      confirmId: confirmData.id,
      userId: user.id,
    };

    // const tokens = tokenService.generateTokens({ ...userDto });

    // await tokenService.saveToken(userDto.id, tokens.refreshToken);
    // return {
    //   ...tokens,
    //   user: userDto,
    // };
  }

  async confirmAccessByEmaill(id, code, userId) {
    const confrim = await client.confirmCode.findFirst({ where: { id } });

    if (!confrim) {
      throw ApiError.BadRequest('Неправильный запрос');
    }

    if (confrim.confirmCode != code) {
      throw ApiError.BadRequest('Неверный код подтверждения');
    }

    await client.confirmCode.delete({ where: { id } });
    const user = await client.user.findFirst({ where: { id: userId } });

    const userDto = new UserDto(user);

    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await client.user.findFirst({ where: { id: userData.id } });
    console.log(user, 'from refresh user-service');

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }

  async getAllTeachers() {
    const users = await client.teacher.findMany();
    return users;
  }

  async getUser(id) {
    const user = await client.user.findFirst({
      where: { id },
    });
    return user;
  }
}

module.exports = new UserService();
