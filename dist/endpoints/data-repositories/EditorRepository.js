"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditorRepository = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EditorRepository = exports.EditorRepository = function () {
    function EditorRepository(dbService) {
        _classCallCheck(this, EditorRepository);

        this.dbService = dbService;
        console.log("== In EditorRepository  ==");
    }

    _createClass(EditorRepository, [{
        key: "updateData",
        value: function updateData(db, data) {
            var collection = "content",
                filter = { "_id": 1 },
                update = {
                "$set": { "content": data }
            };

            return _q2.default.ninvoke(db.collection("content"), "updateOne", filter, update);
        }
    }, {
        key: "updateContent",
        value: function updateContent(content) {
            var _this = this;

            return this.dbService.getMongoDBObject().then(function (db) {
                return _this.updateData(db, content);
            }).catch(function (err) {
                console.log("err : ", err);
            });
        }
    }, {
        key: "insertDocument",
        value: function insertDocument(db, callback) {
            db.collection('content').insertOne({ "_id": 1 }, function (err, result) {
                console.log("Inserted a document into the content collection.");
                callback();
            });
        }
    }]);

    return EditorRepository;
}();
//# sourceMappingURL=EditorRepository.js.map
