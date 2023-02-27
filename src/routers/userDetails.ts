import { Router } from "express";
import { getUserDetails } from '../controllers/userController'

export const userRouter = Router()
userRouter.get('/users/:userId', getUserDetails)
