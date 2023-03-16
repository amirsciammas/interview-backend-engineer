import express from "express";
import { AlbumController } from "../controllers/albumController";

const albumRouter = express.Router();

albumRouter.get("/:id/images", AlbumController.getAlbumsAndImagesByUserId);

export { albumRouter };