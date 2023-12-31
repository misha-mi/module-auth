const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const client = new PrismaClient();

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenDate = await client.token.findFirst({ where: { userId } }); // Работает только для одной сессии, если заходить с другого устройства сесия сбросится
    if (tokenDate) {
      tokenDate.refreshToken = refreshToken;
      return client.token.update({
        where: {
          userId,
        },
        data: tokenDate,
      });
    }

    const token = await client.token.create({ data: { userId, refreshToken } });
    return token;
  }

  async removeToken(refreshToken) {
    const { id } = await client.token.findFirst({ where: { refreshToken } });
    const tokenData = await client.token.delete({ where: { id } });
    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await client.token.findFirst({ where: { refreshToken } });
    return tokenData;
  }
}

module.exports = new TokenService();
