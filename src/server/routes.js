const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/users', userController.getAllUser);
router.get('/users/:id', userController.getUserById);
router.get('/users/:id/albums', userController.getUserAlbumsById);
router.get('/users/:id/albums-and-images', userController.getUserAlbumsAndImagesByUserId);

module.exports = router;
