const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const City = sequelize.define('city', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    city: Sequelize.STRING
});

module.exports = City;