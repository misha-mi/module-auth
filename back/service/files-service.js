const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const client = new PrismaClient();

const dirPath = 'D:\\diploma\\modules\\module-auth\\back\\files';

class FilesService {
  async createDir(file) {
    const filePath = `${dirPath}\\${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: 'Папка была создан' });
        } else {
          return reject({ message: 'Папка с таким именем уже существует' });
        }
      } catch (erorr) {
        return reject({ message: { erorr } });
      }
    });
  }
}

module.exports = new FilesService();
