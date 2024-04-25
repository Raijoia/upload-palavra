import { Request, Response } from "express";
import { AuthUser } from "../interfaces/IUser";

const AuthService = require('../services/authService');
const authService = new AuthService();

class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const { email, password }: AuthUser = req.body;
      const token = await authService.login({ email, password });

      res.status(200).send(token);
    } catch (error: any) {
      res.status(401).send({ message: error.message });
    }
  }
}

module.exports = AuthController;