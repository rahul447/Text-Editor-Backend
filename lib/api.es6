"use strict";
import express from "express";
import bodyParser from "body-parser";
import domain from "express-domain-middleware";
import mwAllowCrossDomain from "./middleware_services/mwAllowCrossDomain";
import {MongoDbService} from "./MongoDB/MongoDbService";
import {MongoChecker} from "./MongoDB/MongoChecker";
import Q from "q";
import {editorService} from "./endpoints/services/editorService";


let config = Object.freeze(require("../config/config")),
    app = express(),
    dbService = new MongoDbService({config}),
    mongoChecker = new MongoChecker(dbService),
    router = express.Router(),
    editorRoute = router.route("/");

app.use(mwAllowCrossDomain);
app.use(domain);
app.set("port", config.http.port);
app.set("domain", config.http.domain);
app.use(bodyParser.json());

// health Check of Api
app.get("/healthcheck", (req, res) => {
    res.status(200).send("OKYE");
});

app.use("/update", router);

function startMongoDBPolling() {
    return Q.Promise((resolve, reject) => {
        mongoChecker.mongoDbStatus()
            .then(pingResult => {
                console.log("startMongoDBPolling()//Mongodb up and running: " + JSON.stringify(pingResult));
                resolve();
            }, err => {
                console.log("startMongoDBPolling()//Error in connecting to Mongodb...", err);
                reject();
            });
    });
}

startMongoDBPolling()
    .then(() => {
        console.log("================MongoDB Polling Started====================");
        console.log("================MongoDB Polling Started====================");

        // Starts the app
        app.listen(app.get("port"), app.get("domain"), function () {
            console.log("Server has started and is listening on port: " + app.get("port") + " and ip : " +
                app.get("domain"));

            let editorServiceObject = new editorService(config, dbService);
            editorRoute.post(editorServiceObject.storeToDb.bind(editorServiceObject));
        });
    })
    .catch(err => {
        logger.debug("Error occured in startMongoDBPolling()", err);
    });

module.exports = app;


