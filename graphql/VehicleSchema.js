//add dependencies od GraphQL
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
//add VehicleModel
var VehicleModel = require('../models/Vehicle');

//create the object of Vehicle model
var bookType = new GraphQLObjectType({
  name: 'vehicle',
  fields: function () {
    return {
      _id: {
        type: GraphQLInt
      },
      name: {
        type: GraphQLString
      },
      model: {
        type: GraphQLString
      },
      year: {
        type: GraphQLInt
      },
      plate: {
        type: GraphQLString
      },
      qrdata: {
        type: GraphQLString
      },
    }
  }
});
//create a list of type
var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      vehicles: {
        type: new GraphQLList(vehicleType),
        resolve: function () {
          const vehicles = VehicleModel.find().exec()
          if (!vehicles) {
            throw new Error('Error')
          }
          return vehicles
        }
      },
      vehicle: {
        type: vehicleType,
        args: {
          id: {
            name: '_id',
            type: GraphQLInt
          }
        },
        resolve: function (root, params) {
          const vehicleDetails = VehicleModel.findById(params.id).exec()
          if (!vehicleDetails) {
            throw new Error('Error')
          }
          return vehicleDetails
        }
      }
    }
  }
});

//add operation of mutation add, remove and update
var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      addVehicle: {
        type: vehicleType,
        args: {
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          model: {
            type: new GraphQLNonNull(GraphQLString)
          },
          year: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          plate: {
            type: new GraphQLNonNull(GraphQLString)
          },
          qrdata: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, params) {
          const vehicleModel = new VehicleModel(params);
          const newVehicle = vehicleModel.save();
          if (!newVehicle) {
            throw new Error('Error');
          }
          return newVehicle
        }
      },
      updateVehicle: {
        type: vehicleType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLInt)
          },
          name: {
            type: new GraphQLNonNull(GraphQLString)
          },
          model: {
            type: new GraphQLNonNull(GraphQLString)
          },
          year: {
            type: new GraphQLNonNull(GraphQLInt)
          },
          plate: {
            type: new GraphQLNonNull(GraphQLString)
          },
          qrdata: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          return VehicleModel.findByIdAndUpdate(params.id, { name: params.name, model: params.model, year: params.year, plate: params.plate, qrdata: params.qrdata, dt_updated: new Date() }, function (err) {
            if (err) return next(err);
          });
        }
      },
      removeVehicle: {
        type: vehicleType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        resolve(root, params) {
          const remVehicle = VehicleModel.findByIdAndRemove(params.id).exec();
          if (!remVehicle) {
            throw new Error('Error')
          }
          return remVehicle;
        }
      }
    }
  }
});

//export module
module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
