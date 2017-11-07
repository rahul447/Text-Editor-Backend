"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MongoChecker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MongoChecker = exports.MongoChecker = function () {
  function MongoChecker(dbService) {
    _classCallCheck(this, MongoChecker);

    this.dbService_ = dbService;
  }

  _createClass(MongoChecker, [{
    key: "mongoDbStatus",
    value: function mongoDbStatus() {
      return this.dbService_.getMongoDBObject().then(function (database) {
        var dbAdmin = database.admin();
        return _q2.default.ninvoke(dbAdmin, "ping");
      });
    }
  }]);

  return MongoChecker;
}();
//# sourceMappingURL=MongoChecker.js.map
