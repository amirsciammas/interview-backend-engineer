const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('' , '' , '' , {
    dialect : 'sqlite',
    host : path.resolve('database.sqli')
});

module.exports = sequelize;