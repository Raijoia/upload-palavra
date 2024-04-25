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

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userServices.getAllUsers();

      res.status(200).json(users);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userServices.getUserById(id);

      res.status(200).json(user);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password }: DtoUser = req.body;
      const updatedUser = await userServices.updateUser({
        id,
        name,
        email,
        password,
      });

      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await userServices.deleteUser(id);

      res.status(200).json({ message: `User with id ${id} has been deleted}` });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;