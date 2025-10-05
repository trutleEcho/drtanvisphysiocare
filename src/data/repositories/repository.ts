export default interface Repository<T, FindUniqueArgs, FindManyArgs, CountArgs, createArgs, UpdateArgs, UpsertArgs> {
    exists(query: FindUniqueArgs): Promise<boolean>;
    count(query?: CountArgs): Promise<number>;
    getOne(query: FindUniqueArgs): Promise<T | null>;
    getAll(query?: FindManyArgs): Promise<T[]>;
    create(data: createArgs): Promise<T>;
    update(query: FindUniqueArgs, data: UpdateArgs): Promise<T>;
    upsert(query: FindUniqueArgs, data: UpsertArgs): Promise<T>;
    delete(query: FindUniqueArgs): Promise<T>;
}
