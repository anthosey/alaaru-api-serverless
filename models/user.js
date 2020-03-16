const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: Sequelize.STRING,
    email: Sequelize.STRING,
    mobile: Sequelize.STRING,
    password: Sequelize.STRING,
    wallet: Sequelize.DOUBLE,
    status: Sequelize.STRING
});

module.exports = User;