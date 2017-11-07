"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressDomainMiddleware = require("express-domain-middleware");

var _expressDomainMiddleware2 = _interopRequireDefault(_expressDomainMiddleware);

var _mwAllowCrossDomain = require("./middleware_services/mwAllowCrossDomain");

var _mwAllowCrossDomain2 = _interopRequireDefault(_mwAllowCrossDomain);

var _MongoDbService = require("./MongoDB/MongoDbService");

var _MongoChecker = require("./MongoDB/MongoChecker");

var _editorService = require("./endpoints/services/editorService");

var _q = require("q");

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = Object.freeze(require("../config/config")),
    app = (0, _express2.default)(),
    dbService = new _MongoDbService.MongoDbService({ config: config }),
    mongoChecker = new _MongoChecker.MongoChecker(dbService),
    router = _express2.default.Router(),
    editorRoute = router.route("/");

app.use(_mwAllowCrossDomain2.default);
app.use(_expressDomainMiddleware2.default);
app.set("port", config.http.port);
app.set("domain", config.http.domain);
app.use(_bodyParser2.default.json());

// health Check of Api
app.get("/healthcheck", function (req, res) {
    res.status(200).send("OKYE");
});

app.use("/update", router);

function startMongoDBPolling() {
    return _q2.default.Promise(function (resolve, reject) {
        mongoChecker.mongoDbStatus().then(function (pingResult) {
            console.log("startMongoDBPolling()//Mongodb up and running: " + JSON.stringify(pingResult));
            resolve();
        }, function (err) {
            console.log("startMongoDBPolling()//Error in connecting to Mongodb...", err);
            reject();
        });
    });
}

startMongoDBPolling().then(function () {
    console.log("================MongoDB Polling Started====================");
    console.log("================MongoDB Polling Started====================");

    var editorServiceObject = new _editorService.editorService(config, dbService);
    editorRoute.post(editorServiceObject.storeToDb.bind(editorServiceObject));

    // Starts the app
    app.listen(app.get("port"), app.get("domain"), function () {
        console.log("Server has started and is listening on port: " + app.get("port") + " and ip : " + app.get("domain"));

        dbService.getMongoDBObject().then(function (db) {
            editorServiceObject.repository_.insertDocument(db, function () {
                console.log("basic inserted");
            });
        }).catch(function (err) {
            console.log("err : ", err);
        });
    });
}).catch(function (err) {
    logger.debug("Error occured in startMongoDBPolling()", err);
});

module.exports = app;
//# sourceMappingURL=api.js.map
