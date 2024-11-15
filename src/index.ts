import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes/root";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/api-errors";
import { SignupSchema } from "./models/user";

const app: Express = express();
export const prismaClient = new PrismaClient();

app.use(express.json());
app.use("/api", rootRouter);
app.use(errorMiddleware); // error handling middleware must be placed after all routes

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
