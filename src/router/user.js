const express = require("express");
const router = express.Router();

const UserController = require('../controllers/user');


router.get("/:id" , UserController.getUser);
router.get("/:id/albums" , UserController.getUserAblums);
router.get("/:id/albums/images" , UserController.getUserAblumsAndImages);

module.exports = router;