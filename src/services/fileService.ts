import { prisma } from "../controllers/prismaController";

class FileService {
  async uploadFile(file: any) {
    const fileExists = await prisma.upload.findUnique({
      where: {
        filename: file.originalname,
      },
    });

    if (fileExists) {
      throw new Error('File already exists');
    }

    const fileUploaded = await prisma.upload.create({
      data: {
        filename: file.originalname,
        location: file.path,
      },
    });

    return fileUploaded;
  }
}

module.exports = FileService;