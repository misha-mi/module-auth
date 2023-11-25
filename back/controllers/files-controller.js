const { PrismaClient } = require('@prisma/client');

const filesService = require('../service/files-service');

const client = new PrismaClient();

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
}

module.exports = new FilesController();
