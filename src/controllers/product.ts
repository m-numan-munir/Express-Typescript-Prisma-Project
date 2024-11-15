import { Product } from "@prisma/client";
import { Request, Response } from "express";
import { prismaClient } from "..";

export const create = async (req: Request, res: Response) => {
  let product: Product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.status(200).json({ product });
};
