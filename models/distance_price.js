const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Distance_Price = sequelize.define('distance_price', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    districtFrom: Sequelize.STRING,
    districtTo: Sequelize.STRING,
    price: Sequelize.DOUBLE
});

module.exports = Distance_Price;