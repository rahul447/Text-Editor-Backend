"use strict";

import {MongoClient} from "mongodb";
import Q from "q";

export class MongoDbService {

  constructor({config}) {
    if (!config || !config.mongoDb.connectionString) {
      throw new Error("MongoDB connection string not available");
    }

    this.connectionString_ = config.mongoDb.connectionString;
    this.dbConnection_ = this.connectToDB();
  }

  connectToDB() {
      console.log("connecting to mongo ");
    this.dbConnection_ = Q.ninvoke(MongoClient, "connect", this.connectionString_);
    return this.dbConnection_;
  }


  getMongoDBObject() {
    return this.dbConnection_
      .catch(err => {
        console.log(" MongoDB connection is not available");
        console.log(" err : ", err);
      })
      .then(dbConn => {
        return dbConn;
      });
  }
}
