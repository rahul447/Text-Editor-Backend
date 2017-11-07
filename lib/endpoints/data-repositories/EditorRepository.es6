"use strict";
import Q from "q";
export class EditorRepository {

    constructor(dbService) {
        this.dbService = dbService;
        console.log(`== In EditorRepository  ==`);
    }

    updateData(db, data) {
        let collection = "content",
        filter = {"_id": 1},
        update = {
            "$set": {"content": data}
        };

        return Q.ninvoke(db.collection("content"), "updateOne", filter, update);
    }

    updateContent(content) {
        return this.dbService.getMongoDBObject().then((db) => {
            return this.updateData(db, content);
        }).catch(err => {
            console.log("err : ", err);
        })
    }

    insertDocument(db, callback) {
        db.collection('content').insertOne( {"_id": 1}, function(err, result) {
            console.log("Inserted a document into the content collection.");
            callback();
        });
    };
}
