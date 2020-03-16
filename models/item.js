const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define('Item', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    category: Sequelize.STRING,
    item_code: Sequelize.STRING,
    weight : Sequelize.STRING,
    item_name: Sequelize.STRING,
    online: Sequelize.STRING,
    weight_price: Sequelize.DOUBLE
});

module.exports = Item;