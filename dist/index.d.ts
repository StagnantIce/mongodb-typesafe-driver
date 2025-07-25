import { Collection } from 'mongodb';
export declare class TypedCollection<T> {
    private collection;
    constructor(collection: Collection<T>);
    insert(doc: T): Promise<import("mongodb").InsertOneResult<T>>;
    find(filter: Partial<T>): Promise<import("mongodb").WithId<T>[]>;
}
