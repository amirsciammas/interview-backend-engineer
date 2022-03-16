const router = require("express").Router();
const validator = require("../middlewares/validator");
const userController = require("../controllers/userController");

router.get("/users", validator.validateRecords(), userController);

module.exports = router;
