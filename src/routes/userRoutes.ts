import express from "express";
import { UserController } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/:id", UserController.getUserById);
userRouter.get("/:id/albums", UserController.getUserAndAlbumsById);

export { userRouter };
