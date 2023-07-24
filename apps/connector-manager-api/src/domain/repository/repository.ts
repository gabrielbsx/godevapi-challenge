export abstract class Repository<T> {
  abstract create(data: T): Promise<void>;
}
