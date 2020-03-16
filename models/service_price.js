const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Service_Price = sequelize.define('service_price', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    service_type: Sequelize.STRING,
    price: Sequelize.DOUBLE
});

module.exports = Service_Price;