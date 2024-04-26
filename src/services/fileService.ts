import { prisma } from "../controllers/prismaController";

class FileService {
  async uploadFile(file: any, id: string) {
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

    const userUploaded = await prisma.userUpload.create({
      data: {
        userId: id,
        uploadId: fileUploaded.id,
      },
    })

    return { fileUploaded, userUploaded };
  }
}

module.exports = FileService;