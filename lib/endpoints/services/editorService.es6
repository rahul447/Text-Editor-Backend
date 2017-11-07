"use strict";
import {EditorRepository} from "../data-repositories/EditorRepository";
export class editorService {

    constructor(config, MongoDbService) {
        this.config = config;
        this.repository_ = new EditorRepository(MongoDbService);
    }

    storeToDb(req){
        return new Promise((resolve, reject) => {
            this.repository_.updateContent(req.body.Content)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err);
            });
        });
    }
}
