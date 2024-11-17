import { Router } from "express";
import authRouter from "./auth.routes";
import productRouter from "./products.routes";
import { userRouter } from "./user.routes";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/products", productRouter);

export default rootRouter;
