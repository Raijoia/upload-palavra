import { NextFunction, Request, Response } from "express";
require('dotenv').config();
const { verify, decode } = require('jsonwebtoken');

interface CustomRequest extends Request {
  userId?: string;
  userEmail?: string;
}

module.exports = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  const [, acessToken] = token.split(' ');

  try {
    verify(acessToken, process.env.SECRET_KEY);
    const { id, email } = await decode(acessToken);

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (error) {
    return res.status(400).send('Invalid token.');
  }
};
