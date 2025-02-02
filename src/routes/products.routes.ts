import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  create,
  deleteOne,
  findAll,
  findById,
  updateOne,
} from "../controllers/product.controller";
import { authMiddleware } from "../middlewares/auth";
import { adminMiddleware } from "../middlewares/admin";

//we can also use
//productRouter.use(authMiddleware)
//at top of the routes under douter declaration, to apply the middleware to all the routes at once,instead of

const productRouter: Router = Router();
productRouter.post(
  "/",
  [asyncHandler(authMiddleware), asyncHandler(adminMiddleware)],
  asyncHandler(create)
);

productRouter.get(
  "/",
  [asyncHandler(authMiddleware), asyncHandler(adminMiddleware)],
  asyncHandler(findAll)
);

productRouter.get(
  "/:id",
  [asyncHandler(authMiddleware), asyncHandler(adminMiddleware)],
  asyncHandler(findById)
);

productRouter.patch(
  "/:id",
  [asyncHandler(authMiddleware), asyncHandler(adminMiddleware)],
  asyncHandler(updateOne)
);

productRouter.delete(
  "/:id",
  [asyncHandler(authMiddleware), asyncHandler(adminMiddleware)],
  asyncHandler(deleteOne)
);

export default productRouter;
