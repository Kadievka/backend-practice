"use strict";

var _this = void 0;

var mongoose = require("mongoose");

require("dotenv").config();

var cluster = process.env.DB_CLUSTER;
var dbHost = process.env.DB_HOST || "localhost";
var dbPort = process.env.DB_PORT || "27017";
var dbName = process.env.DB_DATABASE || "db_test";
var dbUsername = process.env.DB_USERNAME;
var dbPassword = process.env.DB_PASSWORD;
var connectionString;

if (cluster) {
  connectionString = "mongodb+srv://".concat(dbUsername, ":").concat(dbPassword, "@").concat(cluster, "/").concat(dbName);
} else {
  connectionString = dbUsername && dbPassword ? "mongodb://".concat(dbUsername, ":").concat(dbPassword, "@").concat(dbHost, ":").concat(dbPort, "/").concat(dbName) : "mongodb://".concat(dbHost, ":").concat(dbPort, "/").concat(dbName);
}

console.log("connected to... ".concat(connectionString));
module.exports = {
  connect: function connect() {
    return mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  },
  dbName: dbName,
  connectionString: connectionString,
  connection: function connection() {
    if (mongoose.connection) {
      return mongoose.connection;
    }

    return _this.connect();
  }
};