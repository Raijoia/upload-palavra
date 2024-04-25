import { prisma } from "../controllers/prismaController";
import { AuthUser } from "../interfaces/IUser";
const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
require('dotenv').config();

class AuthService {
  async login(dto: AuthUser) {
    const user = await prisma.user.findUnique({
      where: {
        email: dto.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await compare(dto.password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or password incorrect');
    }

    const ONEDAY = 60 * 60 * 24;

    const acessToken = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: ONEDAY,
      }
    );

    return { acessToken };
  }
}

module.exports = AuthService;