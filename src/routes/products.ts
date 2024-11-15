import { Router } from "express";
import asyncHandler from "express-async-handler";
import { create } from "../controllers/product";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

const productRouter: Router = Router();
productRouter.post(
  "/",
  [asyncHandler(authMiddleware), asyncHandler(adminMiddleware)],
  asyncHandler(create)
);

export default productRouter;
