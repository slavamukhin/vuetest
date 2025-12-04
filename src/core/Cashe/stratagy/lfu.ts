// LFU (Least Frequently Used)
// 1. Удаляется элемент, у которого наименьшее количество обращений.
// 2. В отличие от LRU, учитывает не время последнего доступа, а количество всех доступов.
// 3. Требует хранения счётчиков использования.
import type { ICashe } from '../type';

export class LFU<K, V> implements ICashe<K, V> {
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
