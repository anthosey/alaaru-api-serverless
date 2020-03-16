const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Pickup = sequelize.define('pickup', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    bookingRef: Sequelize.STRING,
    pickupRef: Sequelize.STRING,
    
    parcelDescription: Sequelize.STRING,
    estimatedWeight: Sequelize.STRING,
    serviceType: Sequelize.STRING,
    pickupDistrict: Sequelize.STRING,
    pickupAddress: Sequelize.STRING,
    pickupLat: Sequelize.DOUBLE,
    pickupLng: Sequelize.DOUBLE,
    pickupContactPersonName: Sequelize.STRING,
    pickupContactPersonMobile: Sequelize.STRING,
    pickupContactPersonEmail: Sequelize.STRING,
    deliveryDistrict: Sequelize.STRING,
    deliveryAddress: Sequelize.STRING,
    deliveryLat: Sequelize.DOUBLE,
    deliveryLng: Sequelize.DOUBLE,
    deliveryContactPersonName: Sequelize.STRING,
    deliveryContactPersonMobile: Sequelize.STRING,
    deliveryContactPersonEmail: Sequelize.STRING,
    distance: Sequelize.DOUBLE,
    distanceText: Sequelize.STRING,
    duration: Sequelize.DOUBLE,
    durationText: Sequelize.STRING,
    polyline: Sequelize.TEXT,
    distanceApiStatusCode: Sequelize.STRING,
    estimatedBill: Sequelize.DOUBLE,
    actualBill: Sequelize.DOUBLE,
    paymentStatus: Sequelize.STRING,


    distanceCost: Sequelize.DOUBLE,
    serviceCost: Sequelize.DOUBLE,
    weightCost: Sequelize.DOUBLE,

    operationStatus: Sequelize.STRING,
    dispatchOfficer: Sequelize.STRING,
    timeIn: {type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    timePicked: Sequelize.DATE,
    receivedBy: Sequelize.STRING,
    timeDelivered: Sequelize.DATE,
    deliveryEvidence: Sequelize.STRING,
    requestReference: Sequelize.STRING,
    owner: Sequelize.STRING
});

module.exports = Pickup;