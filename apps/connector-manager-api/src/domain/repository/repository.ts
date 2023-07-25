export abstract class Repository<T> {
  abstract create(data: T): Promise<void>;
  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T>;
  abstract update(id: string, data: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
