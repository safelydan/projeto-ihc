"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BusLocation extends Model {
    static associate(models) {
      
    }
  }
  BusLocation.init(
    {
      busNumber: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      timestamp: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "BusLocation",
    }
  );
  return BusLocation;
};
