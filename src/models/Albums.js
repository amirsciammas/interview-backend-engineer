const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/database/database');
const Images = require('./Images');
const User = require('./User');

class Albums extends Model {}

Albums.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    modelName : 'albums',
    timestamps: false
})

User.hasMany(Albums , {foreignKey : 'userId'});
Albums.belongsTo(User , {foreignKey: 'userId'});

Albums.hasMany(Images , {foreignKey : 'albumId'});
Images.belongsTo(Albums , {foreignKey : 'albumId'});

module.exports = Albums;