'use strict';
const Item = require('./models/item');
const Service_Price = require('./models/service_price');
const Weight_Price = require('./models/weight_price');
const Pickup = require('./models/pickup');
const Distance_Price = require('./models/distance_price');
const City = require('./models/city');
const Distance_Billing_Method = require('./models/city');
const User = require('./models/user');

const sequelize = require('./config/db');

module.exports.getStarted = async event => {

// WeightPrice.sync({force: true}); // This function helps reset only one table
  sequelize
        // .sync({force: true}) // This method looks into the model, then create the required tables including 
        // the associations or relationship defined above
        .sync() // This method looks into the model, then create the required tables including 
        // the associations or relationship defined above
        //  .sync({force: true})
        .then(results => {

            //Create Default Data for billing   
            Weight_Price.findOrCreate({ where: { weight: '0-5Kg' }, defaults: { weight: '0-5Kg', price: 200 } });
            Service_Price.findOrCreate({ where: { service_type: 'Regular: 24hrs Delivery' }, defaults: { service_type: 'Regular: 24hrs Delivery', price: 500 } });
            Distance_Price.findOrCreate({ where: { districtFrom: 'Maitama, Abuja' }, defaults: { districtFrom: 'Maitama, Abuja', districtTo: 'Asokoro, Abuja', price: 350, distance: 'Per Km', useDistrict: 'true' } });
            // District.findOrCreate({ where: { district: 'Maitama' }, defaults: { city: 'Abuja', district: 'Maitama' } });
            City.findOrCreate({ where: { city: 'Abuja' }, defaults: { city: 'Abuja' } });
            Distance_Billing_Method.findOrCreate({ where: { id: 1 }, defaults: { useDistrict: 0, pricePerMeter: 0.05 } });
            // Feedback_Title.findOrCreate({ where: { id: 1 }, defaults: { title: 'I have not received my parcel', description: 'No description' } });
            // Item.findOrCreate({ where: {id: 1}, defaults: {category: 'PARCEL', item_name: 'Letter', item_code: '0001', weight: '0-5Kg', online: 'Yes'}});
            // FavoriteItem.findOrCreate({ where: {id: 1}, defaults: {item_code: '0001', online: 'Yes', item_name: 'Letter'}});
            
            return results;
        })
        .then(result => {
            console.log('ENV:' + result);
    })
    return {
      statusCode: 200,
      body: JSON.stringify({message: "Yeah, Alaaru-api works !" + new Date()})
    }
};

// Begin users operations

module.exports.createUser = async event => {
  const data = JSON.parse(event.body);
  console.log('body: ' + data);


  // const id = event.pathParameters.id;
  const firstName = data.firstName;
  const email = data.email;
  const mobile = data.mobile;
  const password = data.password;
  console.log(firstName);
  
  if (!firstName) { 
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "error", message: "missing input"})
    }
  }
  
  try {
    const data = await User.create({firstName: firstName, email: email, mobile: mobile, password: password});
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.getAllUsers = async event => {
  try {
    const data = await User.findAll();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
  
};


module.exports.getUser = async event => {
  const id = event.pathParameters.id;
  try {
    const data = await User.findOne({where: {id: id}});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};


module.exports.updateUser = async event => {
  const data = JSON.parse(event.body);
  const email = data.email;
  const mobile = data.mobile;
  const firstName = data.firstName;
  // const weight = data.weight;
  // const name = data.name;
  // const online = data.online;
  // const weightPrice = data.weightPrice;

  try {
    const user = await User.findOne({where: {email: email}});
    if (!user) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "Not found!"})
      }
    }

    const resul = await user.update({mobile: mobile, firstName: firstName});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "item updated successfully"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.deleteUser = async event => {
  // const id = JSON.parse(event.body).id;
  const id = event.pathParameters.email;
  // console.log('id:' + id);
  try {
    const data = await User.findOne({where: {email: email}});
    if (!data) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "error", data : "Not found!"})
      }
    }
    const resul = await data.destroy();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "item deleted successfully!"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};
// End of User operations

module.exports.getAllItems = async event => {
  try {
    const data = await Item.findAll();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
  
};

module.exports.getOneItem = async event => {
  const id = event.pathParameters.id;
  // const email = event.requestContext.authorizer.claims.email;
  // console.log('In user:' + email);
  try {
    const data = await Item.findOne({where: {id: id}});
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.createItem = async event => {
  const data = JSON.parse(event.body);
  console.log('body: ' + data);

  // const id = event.pathParameters.id;
  const categ = data.categ;
  const itemCode = data.itemCode;
  const weight = data.weight;
  const name = data.name;
  const online = data.online;
  const weightPrice = data.weightPrice;
  console.log('wP' + weight)
  try {
    const data = await Item.create({category: categ, item_code: itemCode, weight: weight, item_name: name, online: online, weight_price: weightPrice});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.deleteItem = async event => {
  const id = JSON.parse(event.body).id;
  console.log('id:' + id);
  try {
    const data = await Item.findOne({where: {id: id}});
    if (!data) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "error", data : "Not found!"})
      }
    }
    const resul = await data.destroy();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "item deleted successfully!"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.updateItem = async event => {
  const data = JSON.parse(event.body);
  const id = data.id;
  const categ = data.categ;
  const itemCode = data.itemCode;
  const weight = data.weight;
  const name = data.name;
  const online = data.online;
  const weightPrice = data.weightPrice;

  try {
    const item = await Item.findOne({where: {id: id}});
    if (!item) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "Not found!"})
      }
    }

    const resul = await item.update({category: categ, item_code: itemCode, weight: weightPrice, item_name: name, online: online, weight_price: weightPrice});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "item updated successfully"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

// Start of Services
module.exports.getAllServices = async event => {
  try {
    const data = await Service_Price.findAll({attributes: ['service_type', 'price']});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
  
};

module.exports.getOneService = async event => {
  const id = event.pathParameters.id;
  try {
    const data = await Service_Price.findOne({where: {id: id}});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.createService = async event => {
  const data = JSON.parse(event.body);
  console.log('body: ' + data);

  // const id = event.pathParameters.id;
  const service = data.service;
  const price = data.price;
  

  try {
    const data = await Service_Price.create({service_type: service, price: price});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.deleteService = async event => {
  const id = JSON.parse(event.body).id;
  console.log('id:' + id);
  try {
    const data = await Service_Price.findOne({where: {id: id}});
    if (!data) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "error", data : "Not found!"})
      }
    }
    const resul = await data.destroy();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "Service deleted successfully!"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.updateService = async event => {
  const data = JSON.parse(event.body);
  const id = data.id;
  const service = data.service;
  const price = data.price;
  
  try {
    const sp = await Service_Price.findOne({where: {id: id}});
    if (!sp) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "Not found!"})
      }
    }

    const resul = await sp.update({service_type: service, price: price});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "Service updated successfully"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};
// End of Services


// Start of Weight Prices
module.exports.getAllWeightPrices = async event => {
  try {
    const data = await Weight_Price.findAll();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
  
};

module.exports.getOneWeightPrice = async event => {
  const id = event.pathParameters.id;
  try {
    const data = await Weight_Price.findOne({where: {id: id}});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.createWeightPrice = async event => {
  const data = JSON.parse(event.body);
  console.log('body: ' + data);

  // const id = event.pathParameters.id;
  const weight = data.weight;
  const price = data.price;
  

  try {
    const data = await Weight_Price.create({weight: weight, price: price});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.deleteWeightPrice = async event => {
  const id = JSON.parse(event.body).id;
  console.log('id:' + id);
  try {
    const wp = await Weight_Price.findOne({where: {id: id}});
    if (!wp) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "error", data : "Not found!"})
      }
    }
    const resul = await wp.destroy();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "WeightPrice deleted successfully!"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.updateWeightPrice = async event => {
  
  
  try {
    const data = JSON.parse(event.body);
    const id = data.id;
    const weight = data.weight;
    const price = data.price;
  
    const wp = await Weight_Price.findOne({where: {id: id}});
    if (!wp) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "Not found!"})
      }
    }

    const resul = await wp.update({weight: weight, price: price});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "WeightPrice updated successfully"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " +  e
    }
  } 
};
// End of Weight Price


// Start of Pickup operations
module.exports.getAllPickups = async event => {
  try {
    const data = await Pickup.findAll();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
  
};

module.exports.getPickupByBookingRef = async event => {
  const br = event.pathParameters.br;
  try {
    const data = await Pickup.findOne({where: {bookingRef: br}});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};


module.exports.getPickupByPickupRef = async event => {
  const pr = event.pathParameters.pr;
  try {
    const data = await Pickup.findOne({where: {pickupRef: pr}});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};


module.exports.getPickupByStatus = async event => {
  const status = event.pathParameters.status;
  try {
    const data = await Pickup.findAll({where: {operationStatus: status}});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};


module.exports.getPickupByOfficer = async event => {
  const officer = event.pathParameters.officer;
  try {
    const data = await Pickup.findOne({where: {dispatchOfficer: officer}});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.createPickup = async event => {
  const data = JSON.parse(event.body);
  console.log('body: ' + data);

  // const id = event.pathParameters.id;
  const weight = data.weight;
  const price = data.price;
  

  try {
    const data = await Pickup.create({estimatedWeight: weight, estimatedBill: price});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

module.exports.deletePickupByPickupRef = async event => {
  const pRef = JSON.parse(event.body).pickupRef;
  // const pRef = event.pathParameters.pr;
  // console.log('id:' + id);
  try {
    const pc = await Pickup.findOne({where: {pickupRef: pRef}});
    if (!pc) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "error", data : "Not found!"})
      }
    }
    const resul = await pc.destroy();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "Pickup deleted successfully!"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " + e
    }
  } 
};

const checkStatus = (inStatus) => {
  switch (inStatus) {
    case 'pending':
      return 'valid';
      break;
    case 'assigned':
      return 'valid';
      break;
    case 'picked':
      return 'valid';
      break;
    case 'received':
      return 'valid';
      break;
    case 'delivered':
      return 'valid';
      break;
    default:
      return 'Invalid';
  }
}
module.exports.updatePickupStatus = async event => {
  try {
    
    const data = JSON.parse(event.body);
    const pRef = data.pickupRef;
    const status = data.status;
    // Check or validate the status
  const check = checkStatus(status);
    if (check != 'valid') {
      return {
        statusCode: 401,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "Invalid Status update!"})
      }
    }

    const pr = await Pickup.findOne({where: {pickupRef: pRef}});
    if (!pr) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({status: "Not found!"})
      }
    }

    const resul = await pr.update({operationStatus: status});
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({status: "success", data: "Pickup status updated successfully"})
    }
  } catch(e) {
    return {
      statusCode: e.statusCode || 500,
      body: "Error occured: " +  e
    }
  } 
};
// End of Weight Pickup operations