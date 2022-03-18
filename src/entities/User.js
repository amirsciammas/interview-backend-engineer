const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/dbConfig");

class User extends Model {}

/**
 * For User Entity depends on DB Table Schema
 *CREATE TABLE [users] (
	[id] INT NULL,
	[name] VARCHAR (50),
	[email] VARCHAR (100),
	[address_geo_lat] FLOAT,
	[address_geo_lng] FLOAT
);
 */
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    address_geo_lat: {
      type: DataTypes.FLOAT,
    },
    address_geo_lng: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: false,
  }
);

module.exports = User;
