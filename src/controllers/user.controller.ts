import { Address, User } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "..";
import {
  throwInternalServerException,
  throwNotFoundException,
} from "../exceptions/http-exceptions";

export const findAll = async (req: Request, res: Response) => {
  await prismaClient.user.findMany().then((records: User[]) => {
    res.status(200).json(records);
  });
};

export const findOne = async (req: Request, res: Response) => {
  await prismaClient.user
    .findFirstOrThrow({ where: { id: +req.params.id } })
    .then((records: User) => {
      res.status(200).json(records);
    })
    .catch((err: any) => {
      if (err.code === "P2025") {
        throwNotFoundException("User not found!");
      }

      throwInternalServerException(err.meta.cause);
    });
};

export const createAddress = async (req: Request, res: Response) => {
  let address: Address = await prismaClient.address.create({
    data: {
      ...req.body,
      userId: req.user!.id,
    },
  });

  res.status(200).json(address);
};

export const deleteAddress = async (req: Request, res: Response) => {
  await prismaClient.address
    .delete({ where: { id: +req.params.id } })
    .then((record: Address) => {
      res.status(200).json({ isDeleted: true, record });
    })
    .catch((err: any) => {
      if (err.code === "P2025") {
        throwNotFoundException(err.meta.cause);
      }

      throwInternalServerException(err.meta.cause);
    });
};

export const findAddresses = async (req: Request, res: Response) => {
  await prismaClient.address
    .findMany({ where: { id: req.user!.id }, include: { user: true } })
    .then((records: Address[]) => {
      res.status(200).json(records);
    })
    .catch((err: any) => {
      if (err.code === "P2025") {
        throwNotFoundException(err.meta.cause);
      }

      throwInternalServerException(err.meta.cause);
    });
};
