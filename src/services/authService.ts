import { hash } from "bcryptjs";
import { prisma } from "../controllers/prismaController";
import { AuthUser, DtoUser } from "../interfaces/IUser";
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
        active: true,
      }
    });

    if (!user || !user.active) {
      throw new Error('User not found or inactive');
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

      const passwordHash = await hash(
        dto.password,
        Number(process.env.SALT_ROUNDS)
      );

      const user = await prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          password: passwordHash,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return user;
    } catch (error: any) {
      throw new Error(`An error occurred while creating the user: ${error}`);
    }
  }
}

module.exports = AuthService;