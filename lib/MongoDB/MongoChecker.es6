"use strict";

import Q from "q";

export class MongoChecker {

  constructor(dbService) {
      this.dbService_ = dbService;
  }
  mongoDbStatus() {
    return this.dbService_
      .getMongoDBObject()
      .then(database => {
        let dbAdmin = database.admin();
        return Q.ninvoke(dbAdmin, "ping");
      });
  }
}
