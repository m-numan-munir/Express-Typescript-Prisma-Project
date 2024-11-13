import { Router } from "express";
import { login, signup } from "../controllers/auth";
import asyncHandler from "express-async-handler";

const authRoutes: Router = Router();

//express-async-handler is a third party middleware for handling exceptions inside of async express routes and passing them to your express error handler

//A custome express-async-handler function can also be created by anyone

authRoutes.get("/login", asyncHandler(login));
authRoutes.post("/signup", asyncHandler(signup));

export default authRoutes;
