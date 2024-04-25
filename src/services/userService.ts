import type { DtoUser, IUser } from '../interfaces/IUser';
import { prisma } from '../controllers/prismaController';

class UserService {
  async createUser(dto: DtoUser) {
    try {
      const userExists = await prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (userExists) {
        throw new Error('Already registered user');
      }

      const user = await prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
        },
      });

      return user;
    } catch (error: any) {
      throw new Error(`An error occurred while creating the user: ${error}`);
    }
  }

  async getAllUsers() {
    try {
      return await prisma.user.findMany({
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

      if (!user) {
        throw new Error('User not found');
      }

      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
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

      await prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error: any) {
      throw new Error(`An error occurred while deleting the user: ${error}`);
    }
  }
}

module.exports = UserService;