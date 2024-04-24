import { prisma } from "../controllers/prismaController";

class FileService {
  async uploadFile(file: any) {
    return `arquivo ${file.originalname} enviado com sucesso!`;
  }
}

module.exports = FileService;