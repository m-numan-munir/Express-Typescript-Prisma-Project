import { Router } from "express";
import { login, signup } from "../controllers/auth.controller";
import asyncHandler from "express-async-handler";

const authRouter: Router = Router();

//express-async-handler is a third party middleware for handling exceptions inside of async express routes and passing them to your express error handler

//A custome express-async-handler function can also be created by anyone

// authRouter.post("/login", asyncHandler(login));
authRouter.route("/login").post(asyncHandler(login));
authRouter.post("/signup", asyncHandler(signup));

export default authRouter;
