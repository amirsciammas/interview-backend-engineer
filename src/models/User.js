const { Model , DataTypes } = require('sequelize');
const sequelize = require('../config/database/database');

class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    address_geo_lat: {
        type: DataTypes.FLOAT
    },
    address_geo_lng: {
        type: DataTypes.FLOAT
    }
}, {
    sequelize,
    modelName : 'user',
    timestamps: false
});



module.exports = User;