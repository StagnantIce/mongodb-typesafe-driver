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
} from 'mongodb';

type EntitySort<T> = { [P in keyof T] ?: SortDirection };
type EntitySelect<T> = { [P in keyof T] ?: 0 | 1 };

export type FindOptions<T extends Document> = Omit<MongoDbFindOptions<T>, 'sort' | 'projection'> & {
    sort?: EntitySort<T>;
    projection?: EntitySelect<T> | Document;
};

export declare interface RootFilterOperators<TSchema> {
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

export declare type Filter<TSchema> = {
    [P in keyof WithId<TSchema>]?: Condition<WithId<TSchema>[P]>;
} & RootFilterOperators<WithId<TSchema>>;

export declare type MatchKeysAndValues<TSchema> = Readonly<Partial<TSchema>>;
export declare type UpdateFilter<TSchema> = {
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
