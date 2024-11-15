import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { throwAccessDeniedException } from "../exceptions/http-exceptions";
import { JWT_SECRET } from "../secrets";
import { Role, User } from "@prisma/client";
import { prismaClient } from "..";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let user: User = req.user!;
  if (!user) throwAccessDeniedException("Access denied!");

  if (user.role !== Role.ADMIN) {
    throwAccessDeniedException("Unauthorized!");
  }
  console.log("<--------- Just Right Before Calling Next ---->");

  next();

  console.log("<--------- Allowed From Admin MiddleWare ---->");
};
