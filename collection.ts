import {
    Collection as MongoDbCollection,
    OptionalUnlessRequiredId,
    InsertOneOptions,
    InsertOneResult,
    BulkWriteOptions,
    InsertManyResult,
    UpdateOptions,
    UpdateResult,
    WithoutId,
    ReplaceOptions,
    DeleteOptions,
    DeleteResult,
    WithId,
    FindCursor,
    AggregateOptions,
    AggregationCursor,
    CountOptions,
    FindOneAndUpdateOptions,
    FindOneAndDeleteOptions,
    FindOneAndReplaceOptions,
    ModifyResult,
} from 'mongodb';
import { Filter, UpdateFilter, FindOptions } from './filter';
import { Document } from 'bson';

// @ts-ignore
export interface Collection<
    TSchema extends object
> extends MongoDbCollection<TSchema> {
    insertOne(
        doc: OptionalUnlessRequiredId<NonNullable<TSchema>>,
        options?: InsertOneOptions
    ): Promise<InsertOneResult<TSchema>>;

    insertMany(
        docs: ReadonlyArray<OptionalUnlessRequiredId<NonNullable<TSchema>>>,
        options?: BulkWriteOptions
    ): Promise<InsertManyResult<TSchema>>;

    updateOne(
        filter: Filter<TSchema>,
        update: UpdateFilter<TSchema> | Document[],
        options?: UpdateOptions
    ): Promise<UpdateResult<TSchema>>;

    updateMany(
        filter: Filter<TSchema>,
        update: UpdateFilter<TSchema> | Document[],
        options?: UpdateOptions
    ): Promise<UpdateResult<TSchema>>;

    replaceOne(
        filter: Filter<TSchema>,
        replacement: WithoutId<TSchema>,
        options?: ReplaceOptions
    ): Promise<UpdateResult<TSchema>>;

    deleteOne(
        filter?: Filter<TSchema>,
        options?: DeleteOptions
    ): Promise<DeleteResult>;

    deleteMany(
        filter?: Filter<TSchema>,
        options?: DeleteOptions
    ): Promise<DeleteResult>;

    findOne(
        filter?: Filter<TSchema>,
        options?: FindOptions<TSchema>
    ): Promise<WithId<TSchema> | null>;

    find(
        filter?: Filter<TSchema>,
        options?: FindOptions<TSchema>
    ): FindCursor<WithId<TSchema>>;

    findOneAndDelete(filter: Filter<TSchema>, options: FindOneAndDeleteOptions & {
        includeResultMetadata: true;
    }): Promise<ModifyResult<TSchema>>;
    findOneAndDelete(filter: Filter<TSchema>, options: FindOneAndDeleteOptions & {
        includeResultMetadata: false;
    }): Promise<WithId<TSchema> | null>;
    findOneAndDelete(filter: Filter<TSchema>, options: FindOneAndDeleteOptions): Promise<WithId<TSchema> | null>;
    findOneAndDelete(filter: Filter<TSchema>): Promise<WithId<TSchema> | null>;

    findOneAndReplace(filter: Filter<TSchema>, replacement: WithoutId<TSchema>, options: FindOneAndReplaceOptions & {
        includeResultMetadata: true;
    }): Promise<ModifyResult<TSchema>>;
    findOneAndReplace(filter: Filter<TSchema>, replacement: WithoutId<TSchema>, options: FindOneAndReplaceOptions & {
        includeResultMetadata: false;
    }): Promise<WithId<TSchema> | null>;
    findOneAndReplace(filter: Filter<TSchema>, replacement: WithoutId<TSchema>, options: FindOneAndReplaceOptions): Promise<WithId<TSchema> | null>;
    findOneAndReplace(filter: Filter<TSchema>, replacement: WithoutId<TSchema>): Promise<WithId<TSchema> | null>;

    findOneAndUpdate(filter: Filter<TSchema>, update: UpdateFilter<TSchema>, options: FindOneAndUpdateOptions & {
        includeResultMetadata: true;
    }): Promise<ModifyResult<TSchema>>;
    findOneAndUpdate(filter: Filter<TSchema>, update: UpdateFilter<TSchema>, options: FindOneAndUpdateOptions & {
        includeResultMetadata: false;
    }): Promise<WithId<TSchema> | null>;
    findOneAndUpdate(filter: Filter<TSchema>, update: UpdateFilter<TSchema>, options: FindOneAndUpdateOptions): Promise<WithId<TSchema> | null>;
    findOneAndUpdate(filter: Filter<TSchema>, update: UpdateFilter<TSchema>): Promise<WithId<TSchema> | null>;

    aggregate<T extends Document = Document>(pipeline?: Document[], options?: AggregateOptions): AggregationCursor<T>;

    count(filter?: Filter<TSchema>, options?: CountOptions): Promise<number>;
}
