import express from 'express';
import { userRouter } from './userDetails';
import { albumRouter } from './albumDetails';
import { imageRouter } from './imagesDetails';

export const routes = express.Router();

routes.use(userRouter);
routes.use(albumRouter);
routes.use(imageRouter);
