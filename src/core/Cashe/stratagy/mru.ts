// MRU (Most Recently Used)
// 1. Удаляется элемент, который был использован совсем недавно.
// 2. Идея: иногда наиболее свежие данные не нужны, а более старые важнее.
// 3. Применяется в специфичных случаях, реже, чем LRU.
import type { ICashe } from '../type';

export class MRU<K, V> implements ICashe<K, V> {
  #capacity: number;
  #storage: Map<K, V>;

  constructor(capacity: number) {
    this.#capacity = capacity;
    this.#storage = new Map<K, V>();
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
