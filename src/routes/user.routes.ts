import { Router } from "express";
import asyncHandler from "express-async-handler";
import { authMiddleware } from "../middlewares/auth";
import {
  createAddress,
  deleteAddress,
  findAddresses,
  findAll,
  findOne,
} from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter.use(asyncHandler(authMiddleware));
// userRouter.use(asyncHandler(adminMiddleware));

userRouter.route("/").get(asyncHandler(findAll));
userRouter.route("/:id").get(asyncHandler(findOne));

userRouter.route("/addresses").post(asyncHandler(createAddress));

userRouter.route("/addresses").get(asyncHandler(findAddresses));

userRouter.route("/addresses/:id").delete(asyncHandler(deleteAddress));
