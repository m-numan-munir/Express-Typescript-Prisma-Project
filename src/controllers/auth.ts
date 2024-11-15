import { NextFunction, Request, Response } from "express";
import { compareSync, hashSync } from "bcrypt";
import {
  throwAccessDeniedException,
  throwConflictException,
  throwValidationException,
} from "../exceptions/http-exceptions";
import { prismaClient } from "../index";
import { userSchemaValidation as continueIfValidBody_Or_ThrowException } from "../utils/util";
import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const login = async (req: Request, res: Response) => {
  let { email, password, name } = req.body;
  let user: User | null = await prismaClient.user.findFirst({
    where: { email },
  });

  if (!user) throwAccessDeniedException("Wrong email or password!");

  let isValidPassword: boolean = compareSync(password, user!.password);

  if (!isValidPassword) throwAccessDeniedException("Wrong email or password!");

  let token = jwt.sign({ userId: user!.id }, JWT_SECRET!);
  res.status(200).json({ user, token });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await continueIfValidBody_Or_ThrowException(req.body);

  let { email, password, name } = req.body;
  let user: User | null = await prismaClient.user.findFirst({
    where: { email },
  });

  if (user) {
    throwConflictException("Email already exists");
  }

  user = await prismaClient.user.create({
    data: { name, email, password: hashSync(password, 10) },
  });

  res.status(200).json(user);
};
