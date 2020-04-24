

const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');
const driver = require('./driverSchemas');
const vehicle = require('./vehicleSchemas');
module.exports = mergeSchemas({
  schemas: [
    driver,
    vehicle
  ],
});
