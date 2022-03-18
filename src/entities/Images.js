const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/dbConfig");

class Images extends Model {}

/**
 * For Images Entity depends on DB Table Schema
 *CREATE TABLE [images] (
	[albumId] INT,
	[id] INT,
	[title] VARCHAR NULL,
	[url] VARCHAR (300)
);
 */
Images.init(
  {
    albumId: {
        type: DataTypes.INTEGER,
      },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    url: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "images",
    timestamps: false,
  }
);

module.exports = Images;
