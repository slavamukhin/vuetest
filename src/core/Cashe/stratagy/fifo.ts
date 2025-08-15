// FIFO (First In First Out) — первый пришёл, первый ушёл
// 1. Удаляется элемент, который первым попал в кеш.
// 2. Простой алгоритм, не учитывающий частоту или давность доступа.
// 3. Эффективен, когда старые данные действительно перестают быть актуальны.
import type { ICashe } from '../type';

export class FIFO<K, V> implements ICashe<K, V> {
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
