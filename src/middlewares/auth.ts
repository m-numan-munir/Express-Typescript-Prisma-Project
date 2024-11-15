import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { throwAccessDeniedException } from "../exceptions/http-exceptions";
import { JWT_SECRET } from "../secrets";
import { User } from "@prisma/client";
import { prismaClient } from "..";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string = req.headers.authorization!;

  if (!token) throwAccessDeniedException("Access denied!");

  let payload = jwt.verify(token, JWT_SECRET!) as any;

  let user: User | null = await prismaClient.user.findFirst({
    where: { id: payload.userId },
  });

  if (!user) throwAccessDeniedException("Access denied!");

  req.user = user!;
  next();
};
