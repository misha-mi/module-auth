const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

const client = new PrismaClient();

class UserService {
  async registraion(email, password) {
    const condidate = await client.user.findFirst({ where: { email } });
    if (condidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует!`);
    }
    const hashPassword = await bcrypt.hash(password, 3); // вытащить соль в .env
    const activationLink = uuid.v4();

    const user = await client.user.create({
      data: { email, password: hashPassword, activationLink },
    });
    await mailService.sendActivateionMail(
      email,
      `${process.env.API_URL}/auth-api/activate/${activationLink}`,
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
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

  async getAllUsers() {
    const users = await client.user.findMany();
    return users;
  }
}

module.exports = new UserService();
