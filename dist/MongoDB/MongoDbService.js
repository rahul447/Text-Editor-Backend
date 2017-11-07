"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MongoDbService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongodb = require("mongodb");

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoDbService = exports.MongoDbService = function () {
  function MongoDbService(_ref) {
    var config = _ref.config;

    _classCallCheck(this, MongoDbService);

    if (!config || !config.mongoDb.connectionString) {
      throw new Error("MongoDB connection string not available");
    }

    this.connectionString_ = config.mongoDb.connectionString;
    this.dbConnection_ = this.connectToDB();
  }

  _createClass(MongoDbService, [{
    key: "connectToDB",
    value: function connectToDB() {
      console.log("connecting to mongo ");
      this.dbConnection_ = _q2.default.ninvoke(_mongodb.MongoClient, "connect", this.connectionString_);
      return this.dbConnection_;
    }
  }, {
    key: "getMongoDBObject",
    value: function getMongoDBObject() {
      return this.dbConnection_.catch(function (err) {
        console.log(" MongoDB connection is not available");
        console.log(" err : ", err);
      }).then(function (dbConn) {
        return dbConn;
      });
    }
  }]);

  return MongoDbService;
}();
//# sourceMappingURL=MongoDbService.js.map
