import { Collection } from './collection';
import { Db } from 'mongodb';
export * from './filter';

export const getCollection = <
    Entity extends Record<string, any>,
    CollectionName extends string,
    D extends Db
>(
    db: D,
    name: CollectionName
): Collection<Entity> =>
    db.collection<Entity>(name) as Collection<Entity>;

export type { Collection };
