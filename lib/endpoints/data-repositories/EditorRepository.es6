"use strict";
import Q from "q";
export class EditorRepository {

    constructor(dbService) {
        this.dbService = dbService;
        console.log(`== In EditorRepository  ==`);
    }

    insertNew(content) {
        return this.dbService.getMongoDBObject().then((db) => {
            return this.insertDocument(db, content, function() {
                console.log("insertion done");
            });
        }).catch(err => {
            console.log("err : ", err);
        });
    }

    insertDocument(db, content, callback) {
        db.collection('content').insertOne( {"_id": 1, "content": content}, function(err, result) {
            console.log("Inserted a document into the content collection.");
            callback();
        });
    }

    getCurrString() {
        return this.dbService.getMongoDBObject().then((db) => {
            return this.findCurrString(db, 1);
        }).catch(err => {
            console.log("err : ", err);
            return Q.reject(`EditorRepository.getCurrString()//Error in query : ${err}`);
        })
    }

    findCurrString(db, id){
        let collName = "content",
            query = {
                "_id": id
            },
            projection = {};

        return Q.ninvoke(db.collection(collName), "findOne", query, projection)
        .catch(err => {
            return Q.reject(`EditorRepository.findCurrString()//Error in query : ${err}`);
        });
    }

    static addcharToString(string, index, replace) {
        return string.substr(0, index) + replace + string.substr(index);
    }

    static removecharFromString(string, index) {
        return string.slice(0, index - 1) + string.slice(index);
    }

    updatePart(partStore){
        console.log("partStore : ", partStore);
        return this.dbService.getMongoDBObject().then((db) => {
            let collection = db.collection("content");
            return collection.find({"_id": 1}).snapshot().forEach(function(str) {
                console.log("str : ", str);
                partStore.map((partObj, partKey) => {
                    if(partObj.added){
                        str.content = EditorRepository.addcharToString(str.content, partStore[partKey -
                            1].value.length, partObj.value)
                    }
                    if(partObj.removed){
                        str.content = EditorRepository.removecharFromString(str.content, partStore[partKey
                        - 1].value.length)
                    }
                });

                let collection = "content",
                    query = {
                        "_id": str._id
                    },
                    document = { "$set": { "content": str.content } };

                return Q.ninvoke(db.collection(collection), "update", query, document);
            });
        }).catch(err => {
            console.log("err : ", err);
            return Q.reject(`EditorRepository.updatePart()//Error in query : ${err}`);
        })
    }
}
