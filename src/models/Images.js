const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/database/database');
const Albums = require('./Albums');

class Images extends Model {}

Images.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    albumId: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName : 'images',
    timestamps: false
});



module.exports = Images;