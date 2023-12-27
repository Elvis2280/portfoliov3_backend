// middleware.js
import { NextFunction, Request, Response } from 'express';
import prisma from '../prismaClient';

export const closePrismaConnection = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await prisma.$disconnect();
    next();
  } catch (error) {
    console.error('Error disconnecting Prisma:', error);
    next(error);
  }
};
