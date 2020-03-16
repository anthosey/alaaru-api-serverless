const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Weight_Price = sequelize.define('weight_price', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    weight: Sequelize.STRING,
    price: Sequelize.DOUBLE
});

module.exports = Weight_Price;