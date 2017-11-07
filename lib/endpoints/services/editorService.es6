"use strict";
import {EditorRepository} from "../data-repositories/EditorRepository";
var jsdiff = require('diff');

export class editorService {

    constructor(config, MongoDbService) {
        this.config = config;
        this.repository_ = new EditorRepository(MongoDbService);
    }

    storeToDb(req){
        return new Promise((resolve, reject) => {
            this.findCurrString(req.body.Content)
            .then(() => {
                resolve();
            })
            .catch(err => {
                console.log("err : ", err);
                reject(err);
            });

        });
    }

    findCurrString(content){
        return new Promise((resolve, reject) => {
            this.repository_.getCurrString()
            .then((currString) => {
                if(currString)
                    this.compareStrings(currString, content).then(() => resolve());
                else {
                    this.repository_.insertNew(content).then(() => resolve());
                }
            })
            .catch(err => {
                reject(err);
            });
        });
    }

    compareStrings(currString, content) {
        console.log(" currString ", currString);
        console.log(" content ", content);
        let partStore = [];
        let diff = jsdiff.diffChars(currString.content, content);
        diff.map((part) => {
            console.log(" part : ", part);
            partStore.push(part);
        });
        return this.updatePart(partStore);
    }

    updatePart(partStore) {
        return new Promise((resolve, reject) => {
            this.repository_.updatePart(partStore)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}
