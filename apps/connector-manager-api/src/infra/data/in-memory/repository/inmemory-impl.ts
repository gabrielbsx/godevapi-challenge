import { Repository } from '@domain/repository/repository';

export class InMemoryRepositoryImpl<T extends { id: string }>
  implements Repository<T>
{
  protected data: T[] = [];

  public async create(data) {
    this.data.push(data);
  }

  public async all(): Promise<T[]> {
    return this.data;
  }

  public async findById(id: string): Promise<T> {
    return this.data.find((item) => item.id === id);
  }

  public async update(id: string, data: T): Promise<void> {
    const itemIndex = this.data.findIndex((item) => item.id === id);
    this.data[itemIndex] = data;
  }

  public async delete(id: string): Promise<void> {
    const itemIndex = this.data.findIndex((item) => item.id === id);
    this.data.splice(itemIndex, 1);
  }
}
