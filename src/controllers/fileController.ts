import { Request, Response } from "express";

const FileService = require('../services/fileService');

const fileService = new FileService();

class FileController {
  static async uploadFile(req: Request, res: Response) {
    try {
      const fileUploaded = await fileService.uploadFile(req.file);

      res.status(201).json({ message: 'Arquivo enviado com sucesso', file: fileUploaded });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao enviar arquivo' });
    }
  }
}

module.exports = FileController;