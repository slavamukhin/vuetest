// TTL (Time To Live) / Expiry-Based
// 1. Элементы живут в кеше определённое время (например, 5 минут).
// 2. После истечения времени элемент автоматически удаляется.
// 3. Часто используется в сочетании с другими алгоритмами.
import type { ICashe } from '../type';

export class TTL<K, V> implements ICashe<K, V> {
  #capacity: number;
  #storage: Map<K, V>;

  constructor(capacity: number) {
    this.#storage = new Map<K, V>();
    this.#capacity = capacity;
  }
  getValues(): V[] {
    throw new Error('Method not implemented.');
  }
  getCurrentInstance(): Map<K, V> {
    throw new Error('Method not implemented.');
  }

  get(key: K): V | undefined {
    return undefined;
  }

  set(key: K, value: V): void {

  }

  size(): number {
    return 0;
  }

  entries(): Array<[K, V]> {
    return [...this.#storage.entries()];
  }
}
