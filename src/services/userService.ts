const { DtoUser } = require('../interfaces/IUser');
import { prisma } from '../controllers/prismaController';

class UserService {
  async createUser(dto: typeof DtoUser) {
    try {
      console.log('dto', dto.email)

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
}

module.exports = UserService;