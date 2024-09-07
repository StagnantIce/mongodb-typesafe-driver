import { Db, ObjectId } from 'mongodb';
import { Collection } from './collection';

class Item {
    public id: ObjectId;
    public name: string;
}


class UserEntity {
    public _id: ObjectId;
    public createdAt: Date;
    public name: string;
    public items: Item[];
    public counters: number[];
}

class ProductEntity {
    public _id: ObjectId;
    public updatedAt: Date;
    public name: string;
}

const getDb = (): Db => null as unknown as Db // TODO: implement yourself

type EntityMap = {
    users: UserEntity,
    projects: ProductEntity
};

const getCollection = <C extends keyof EntityMap>(name: C): Collection<EntityMap[C]> =>
    getDb().collection<EntityMap[C]>(name) as Collection<EntityMap[C]>;

getCollection('users').findOne(
    {
        _id: new ObjectId(),
    },
    {
        sort: { createdAt: -1 },
    }
);

getCollection('users').updateOne(
    {
        _id: new ObjectId(),
    },
    {
        $set: {
            createdAt: new Date(),
        }
    }
);

