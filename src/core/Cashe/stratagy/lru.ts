// LRU (Least Recently Used)
// 1. Удаляется элемент, который дольше всего не использовался (самый старый по времени доступа).
// 2. Идея: элементы, к которым долго не обращались, скорее всего не нужны.
// 3. Часто реализуется с помощью связного списка и хэш-таблицы или Map, сохраняющей порядок использования.
import type { ICashe } from '../type';

export class LRU<K, V> implements ICashe<K, V> {
  private capacity: number;
  private storage: Map<K, V>;

  constructor(capacity: number, initialEntries: Map<K, V> = new Map<K, V>()) {
    this.capacity = capacity;
    this.storage = initialEntries;
  }

  get(key: K): V | undefined {
    if (!this.storage.has(key)) return undefined;
    const value = this.storage.get(key)!;
    this.storage.delete(key);
    this.storage.set(key, value);
    return value;
  }

  set(key: K, value: V): void {
    if (this.storage.has(key)) {
      this.storage.delete(key);
    } else if (this.storage.size >= this.capacity) {
      const firstKey = this.storage.keys().next().value;
      this.storage.delete(firstKey!);
    }

    this.storage.set(key, value);
  }

  size(): number {
    return this.storage.size;
  }

  entries(): Array<[K, V]> {
    return [...this.storage.entries()];
  }

  getCurrentInstance(): Map<K, V> {
    return this.storage;
  }

  getValues(): V[] {
    return [...this.storage.values()];
  }
}
