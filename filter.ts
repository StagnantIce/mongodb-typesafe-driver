import {
    Condition,
    WithId,
    Document,
    Timestamp,
    OnlyFieldsOfType,
    NumericType,
    SetFields,
    PullOperator,
    PushOperator,
    PullAllOperator,
    IntegerType,
    FindOptions as MongoDbFindOptions,
    SortDirection,
    PropertyType,
} from 'mongodb';

export declare type Join<T extends unknown[], D extends string> = T extends [] ? '' : T extends [string | number] ? `${T[0]}` : T extends [string | number, ...infer R] ? `${T[0]}${D}${Join<R, D>}` : never;

export declare type NestedPaths<Type, Depth extends number[]> = Depth['length'] extends 8
    ? []
    : Type extends string | number | bigint | boolean | Date | RegExp | Uint8Array | ((...args: any[]) => any) | {
        _bsontype: string;
    }
    ? []
    : Type extends ReadonlyArray<infer ArrayType>
        ? [] | ['$', ...NestedPaths<ArrayType, [...Depth, 1]>] | NestedPaths<ArrayType, [...Depth, 1]>
        : Type extends object
            ? {
                [Key in Extract<keyof Type, string>]: Type[Key] extends Type
                    ? [Key]
                    : Type extends Type[Key]
                        ? [Key]
                        : Type[Key] extends ReadonlyArray<infer ArrayType>
                            ? Type extends ArrayType
                                ? [Key]
                                : ArrayType extends Type
                                    ? [Key]
                                    : [
                                        Key,
                                        ...NestedPaths<Type[Key], [...Depth, 1]>
                                    ]
                            : // child is not structured the same as the parent
                            [
                                Key,
                                ...NestedPaths<Type[Key], [...Depth, 1]>
                            ] | [Key];
            }[Extract<keyof Type, string>]
            : [];

export type DeepKeys<TSchema> = Join<NestedPaths<TSchema, []>, '.'>

export declare type MatchKeysAndValues<TSchema extends object> = {
    [Property in DeepKeys<TSchema>]?: PropertyType<TSchema, Property>;
};

export declare type FilterDeepCondition<TSchema extends object> = {
    [Property in DeepKeys<TSchema>]?: Condition<PropertyType<TSchema, Property>>;
};

export declare type Filter<TSchema extends object> = FilterDeepCondition<TSchema>
    & RootFilterOperators<WithId<TSchema>>;

type EntitySort<T extends object> = { [P in DeepKeys<T>] ?: SortDirection };
type EntitySelect<T extends object> = { [P in DeepKeys<T>] ?: 0 | 1 };

export type FindOptions<T extends Document> = Omit<MongoDbFindOptions<T>, 'sort' | 'projection'> & {
    sort?: EntitySort<T>;
    projection?: EntitySelect<T> | Document;
};

export declare interface RootFilterOperators<TSchema extends object> {
    $and?: Filter<TSchema>[];
    $nor?: Filter<TSchema>[];
    $or?: Filter<TSchema>[];
    $text?: {
        $search: string;
        $language?: string;
        $caseSensitive?: boolean;
        $diacriticSensitive?: boolean;
    };
    $where?: string | ((this: TSchema) => boolean);
    $comment?: string | Document;
}

export declare type UpdateFilter<TSchema extends object> = {
    $currentDate?: OnlyFieldsOfType<TSchema, Date | Timestamp, true | {
        $type: 'date' | 'timestamp';
    }>;
    $inc?: OnlyFieldsOfType<TSchema, NumericType | undefined>;
    $min?: MatchKeysAndValues<TSchema>;
    $max?: MatchKeysAndValues<TSchema>;
    $mul?: OnlyFieldsOfType<TSchema, NumericType | undefined>;
    $rename?: Record<string, string>;
    $set?: MatchKeysAndValues<TSchema>;
    $setOnInsert?: MatchKeysAndValues<TSchema>;
    $unset?: OnlyFieldsOfType<TSchema, any, '' | true | 1>;
    $addToSet?: SetFields<TSchema>;
    $pop?: OnlyFieldsOfType<TSchema, ReadonlyArray<any>, 1 | -1>;
    $pull?: PullOperator<TSchema>;
    $push?: PushOperator<TSchema>;
    $pullAll?: PullAllOperator<TSchema>;
    $bit?: OnlyFieldsOfType<TSchema, NumericType | undefined, {
        and: IntegerType;
    } | {
        or: IntegerType;
    } | {
        xor: IntegerType;
    }>;
};
