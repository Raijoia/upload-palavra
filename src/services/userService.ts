require('dotenv').config();
import type { DtoUser, IUser } from '../interfaces/IUser';
import { prisma } from '../controllers/prismaController';

const { hash } = require('bcryptjs');

class UserService {
  async getAllUsers() {
    try {
      return await prisma.user.findMany({
        where: {
          active: true,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (error: any) {
      throw new Error(`An error occurred while fetching the users: ${error}`);
    }
  }

  async getUserById(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error: any) {
      throw new Error(`An error occurred while fetching the user: ${error}`);
    }
  }

  async updateUser(dto: IUser) {
    try {
      const { id, name, email, password } = dto;

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user || !user.active) {
        throw new Error('User not found or is inactive');
      }

      const passwordHash = await hash(password, Number(process.env.SALT_ROUNDS));

      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password: passwordHash,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return updatedUser;
    } catch (error: any) {
      throw new Error(`An error occurred while updating the user: ${error}`);
    }
  }

  async deleteUser(id: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      await prisma.user.update({
        where: {
          id,
        },
        data: {
          active: false,
          deletedAt: new Date(),
        },
      });
    } catch (error: any) {
      throw new Error(`An error occurred while deleting the user: ${error}`);
    }
  }
}

module.exports = UserService;