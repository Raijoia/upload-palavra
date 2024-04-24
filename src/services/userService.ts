const { DtoUser } = require('../interfaces/IUser');
import { prisma } from '../controllers/prismaController';

class UserService {
  async createUser(dto: typeof DtoUser) {
    const user = await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: dto.password,
      },
    });

    return user;
  }
}

module.exports = UserService;