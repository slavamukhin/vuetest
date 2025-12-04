// Random Replacement (Случайная замена)
// 1. При переполнении кеша случайным образом удаляется любой элемент.
// 2. Очень прост, но может быть неэффективен.
import type { ICashe } from '../type';

export class RR<K, V> implements ICashe<K, V> {
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
