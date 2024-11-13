import { NextFunction, Request, Response } from "express";
import { hashSync } from "bcrypt";
import { throwConflictException } from "../exceptions/http-exceptions";
import { prismaClient } from "../index";

export const login = (req: Request, res: Response) => {
  res.send("Login Page");
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { email, password, name } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
    throwConflictException("Email already exists");
  }

  user = await prismaClient.user.create({
    data: { name, email, password: hashSync(password, 10) },
  });

  res.json(user);
};
