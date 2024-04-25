import { Request, Response } from "express";
import { AuthUser, DtoUser } from "../interfaces/IUser";

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

  static async register(req: Request, res: Response) {
    try {
      const { name, email, password }: DtoUser = req.body;
      const newUser = await authService.createUser({ name, email, password });

      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = AuthController;