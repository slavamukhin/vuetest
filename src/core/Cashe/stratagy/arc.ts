// ARC (Adaptive Replacement Cache)
// 1. Совмещает преимущества LRU и LFU.
// 2. Автоматически балансирует между недавними и часто используемыми элементами.
// 3. Сложнее в реализации, но даёт лучшую производительность.
import type { ICashe } from '../type';

export class ARC<K, V> implements ICashe<K, V> {
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
