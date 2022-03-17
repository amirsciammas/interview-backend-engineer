const router = require("express").Router();
const validator = require("../middlewares/validator");
const userController = require("../controllers/userController");

router.get("/users/:id", validator.validateRecords(), userController.fetchUserById());
router.get('/users/:id/albums',validator.validateRecords() , userController.fetchUserAndAlbumsByUserId());
router.get('/users/:id/getAlbumsAndImages',validator.validateRecords() , userController.fetchAlbumsAndImagesByUserId());

module.exports = router;
