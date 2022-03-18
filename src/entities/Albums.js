const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/dbConfig");
const Images = require("./Images");
const User = require("./User");

class Albums extends Model {}

/**
 * For Albums Entity depends on DB Table Schema
 *CREATE TABLE [albums] (
    [userId] INT, 
    [id] INT, 
    [title] VARCHAR (200)
)
 */
Albums.init(
  {
    userId: {
      type: DataTypes.INTEGER,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    modelName: "albums",
    timestamps: false,
  }
);

User.hasMany(Albums, { foreignKey: "userId" });
Albums.belongsTo(User, { foreignKey: "userId" });

Albums.hasMany(Images, { foreignKey: "albumId" });
Images.belongsTo(Albums, { foreignKey: "albumId" });

module.exports = Albums;
