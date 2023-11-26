const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const filesService = require('../service/files-service');

const client = new PrismaClient();

const dirPath = 'D:\\diploma\\modules\\module-auth\\back\\files';
class FilesController {
  async createDir(req, res, next) {
    try {
      const userId = req.user.id;
      const { name, type, parent } = req.body;
      let parentFile;
      if (parent) {
        parentFile = await client.files.findFirst({ where: { id: parent } });
      }
      let file = { name, type, userId, access_link: 'none' };
      if (!parentFile) {
        file.path = name;
        file.parent_id = 'root';
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        file.parent_id = parentFile.id;
      }
      const response = await filesService.createDir(file);

      file = await client.files.create({ data: file });
      return res.json(file);
    } catch (error) {
      next(error);
    }
  }

  async findFiles(req, res, next) {
    try {
      const parent_id = req.params.parent;
      const files = await client.files.findMany({ where: { parent_id } });
      return res.json({ files });
    } catch (error) {
      next(error);
    }
  }

  async uploadFile(req, res, next) {
    try {
      let file = req.files.file;
      const userId = req.user.id;
      const parent = await client.files.findFirst({ where: { id: req.body.parent || 'root' } });

      let path;
      if (parent) {
        path = `${parent.path}\\${file.name}`;
      } else {
        path = `${file.name}`;
      }

      if (fs.existsSync(`${dirPath}\\${path}`)) {
        return res.status(400).json({ message: 'Файл уже существует' });
      }

      file.mv(`${dirPath}\\${path}`);

      const type = file.name.split('.').pop();
      let dbFile = {
        name: file.name,
        path,
        type,
        userId: userId,
        parent_id: parent?.id || 'root',
        access_link: 'none',
      };

      file = await client.files.create({ data: dbFile });

      res.json(dbFile);
    } catch (error) {
      next(error);
    }
  }

  async downloadFile(req, res, next) {
    try {
      const file = await client.files.findFirst({ where: { id: req.params.id } });
      const path = `${dirPath}\\${file.path}`;

      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(400).json({ message: 'Файл не найден' });
    } catch (error) {
      next(error);
    }
  }

  async deleteFile(req, res, next) {
    try {
      const file = await client.files.findFirst({ where: { id: req.params.id } });
      if (!file) {
        return res.status(400).json({ message: 'Файл не найден' });
      }

      const path = `${dirPath}\\${file.path}`;
      if (file.type === 'folder') {
        fs.rmdirSync(path);
      } else {
        fs.unlinkSync(path);
      }

      await client.files.delete({ where: { id: req.params.id } });
      return res.json({ message: 'Файл удален' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new FilesController();
