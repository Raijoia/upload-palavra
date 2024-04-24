import { Request, Response } from "express";
import { DtoUser } from "../interfaces/IUser";

const UserServices = require('../services/userService');
const userServices = new UserServices();

class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password }: DtoUser = req.body;
      const newUser = await userServices.createUser({ name, email, password });

      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;