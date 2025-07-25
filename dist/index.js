"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypedCollection = void 0;
class TypedCollection {
    constructor(collection) {
        this.collection = collection;
    }
    insert(doc) {
        return this.collection.insertOne(doc);
    }
    find(filter) {
        return this.collection.find(filter).toArray();
    }
}
exports.TypedCollection = TypedCollection;
