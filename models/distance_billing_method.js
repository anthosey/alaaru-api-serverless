const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Distance_Billing_Method = sequelize.define('distance_billing_method', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
   
    useDistrict: Sequelize.BOOLEAN,
    pricePerMeter: Sequelize.DOUBLE
});

module.exports = Distance_Billing_Method;