const { Sequelize } = require("sequelize");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const dbName = process.env.DB_FILE_NAME || "database.sqli";

const sequelize = new Sequelize("", "", "", {
  dialect: "sqlite",
  host: path.resolve(dbName),
});

module.exports = sequelize;
