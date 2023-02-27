import { Router } from "express";
import { getUserAlbumImageDetails } from '../controllers/userController'

export const imageRouter = Router()
imageRouter.get('/users/:userId/albums/images', getUserAlbumImageDetails)
