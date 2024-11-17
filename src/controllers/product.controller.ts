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

export const findAll = async (req: Request, res: Response) => {
  let product: Product[] = await prismaClient.product.findMany();

  res.status(200).json({ product });
};

export const findById = async (req: Request, res: Response) => {
  let product: Product | null = await prismaClient.product.findFirst({
    where: {
      id: +req.params.id,
    },
  });

  res.status(200).json({ product });
};

export const updateOne = async (req: Request, res: Response) => {
  let product = req.body;
  if (product.tags) {
    product.tags = product.tags.join(",");
  }

  let updatedProduct: Product = await prismaClient.product.update({
    where: {
      id: +req.params.id,
    },
    data: product,
  });

  res.status(200).json({ updatedProduct });
};

export const deleteOne = async (req: Request, res: Response) => {
  let product: Product = await prismaClient.product.delete({
    where: {
      id: +req.params.id,
    },
  });

  res.status(200).json({ product });
};

export const search = async (req: Request, res: Response) => {
  let products: Product[] = await prismaClient.product.findMany({
    where: {
      name: {
        search: req.query.text?.toString(),
      },
      description: {
        search: req.query.text?.toString(),
      },
      tags: {
        search: req.query.text?.toString(),
      },
    },
  });

  res.status(200).json(products);
};
