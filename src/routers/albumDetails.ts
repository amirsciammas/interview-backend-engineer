import { Router } from "express";
import { getUserAndAlbumDetails } from '../controllers/userController'

export const albumRouter = Router()
albumRouter.get('/users/:userId/albums', getUserAndAlbumDetails)
