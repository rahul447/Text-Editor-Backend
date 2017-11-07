"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.editorService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EditorRepository = require("../data-repositories/EditorRepository");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var editorService = exports.editorService = function () {
    function editorService(config, MongoDbService) {
        _classCallCheck(this, editorService);

        this.config = config;
        this.repository_ = new _EditorRepository.EditorRepository(MongoDbService);
    }

    _createClass(editorService, [{
        key: "storeToDb",
        value: function storeToDb(req) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.repository_.updateContent(req.body.Content).then(function () {
                    resolve();
                }).catch(function (err) {
                    reject(err);
                });
            });
        }
    }]);

    return editorService;
}();
//# sourceMappingURL=editorService.js.map
