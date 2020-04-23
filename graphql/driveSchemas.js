//add dependencies od GraphQL
var GraphQLSchema = require("graphql").GraphQLSchema;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLList = require("graphql").GraphQLList;
var GraphQLObjectType = require("graphql").GraphQLObjectType;
var GraphQLNonNull = require("graphql").GraphQLNonNull;
var GraphQLID = require("graphql").GraphQLID;
var GraphQLString = require("graphql").GraphQLString;
var GraphQLInt = require("graphql").GraphQLInt;
var GraphQLDate = require("graphql-date");
const crypto = require('crypto');

//add DriveModel
const DriverModel = require("../models/Driver");

//create the object of Driver model
var driverType = new GraphQLObjectType({
  name: "driver",
  fields: function () {
    return {
      id: {
        type: GraphQLString,
      },
      name: {
        type: GraphQLString,
      },
      birthdate: {
        type: GraphQLDate,
      },
      image: {
        type: GraphQLString,
      },
      pass: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
      dt_created: {
        type: GraphQLDate,
      },
      dt_updated: {
        type: GraphQLDate,
      },
    };
  },
});
//create a list of Driver
const queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      drivers: {
        type: new GraphQLList(driverType),
        resolve: function () {
          let drivers = DriverModel.find().exec();
          if (!drivers) {
            throw new Error("Error");
          }
          return drivers;
        },
      },
      drive: {
        type: driveType,
        args: {
          id: {
            name: "id",
            type: GraphQLString,
          },
        },
        resolve: function (root, params) {
          const driverDetails = DriverModel.findById(params.id).exec();
          if (!driverDetails) {
            throw new Error("Error");
          }
          return driverDetails;
        },
      },
    };
  },
});

//add operation of mutation add, remove and update
var mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: function () {
    return {
      addDriver: {
        type: driveType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          birthdate: {
            type: new GraphQLNonNull(GraphQLDate),
          },
          image: {
            type: new GraphQLNonNull(GraphQLInt),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: function(root, params) {
          const driverModel = new DriverModel(params);
          const newDrive = driverModel.save().then((result) => {
            console.log(result);
            return DriverModel.findByIdAndUpdate(
              result.id,
              {
                //set initial pass freedom
                pass: crypto.createHash('md5').update('freedom').digest("hex")
              },
              function (err) {
                if (err) return next(err);
              }
            );
          });
          return newDrive;
        },
      },
      updateDriver: {
        type: driverType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
          name: {
            type: new GraphQLNonNull(GraphQLString),
          },
          birthdate: {
            type: new GraphQLNonNull(GraphQLDate),
          },
          image: {
            type: new GraphQLNonNull(GraphQLString),
          },
          email: {
            type: new GraphQLNonNull(GraphQLString),
          },
          pass: {
            type: new GraphQLNonNull(GraphQLString),
          }
        },
        resolve(root, params) {
          return DriverModel.findByIdAndUpdate(
            params.id,
            {
              name: params.name,
              birthdate: params.birthdate,
              image: params.image,
              pass: params.pass,
              email: params.email,
              dt_updated: Date.now(),
            },
            function (err) {
              if (err) return next(err);
            }
          );
        },
      },
      removeDrive: {
        type: driverType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve(root, params) {
          const remDrive = DriverModel.findByIdAndRemove(params.id).exec();
          if (!remDrive) {
            throw new Error("Error");
          }
          return remDrive;
        },
      },
    };
  },
});

//export module
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });