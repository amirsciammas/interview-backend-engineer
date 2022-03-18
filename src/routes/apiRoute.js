const router = require("express").Router();
const validator = require("../middlewares/validator");
const userController = require("../controllers/userController");

router.get(
    "/:id", 
    validator.validateRequestUserId(), 
    userController.getUser);
    
router.get(
  "/:id/albums",
  validator.validateRequestUserId(),
  userController.getUserAlbums
);
router.get(
  "/:id/albums/images",
  validator.validateRequestGetUserAlbumsAndImages(),
  userController.getUserAlbumsAndImages
);

module.exports = router;
