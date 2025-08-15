import type { ICashe, Stratagy } from './type';

export class Cashe<K, V> implements ICashe<K, V> {
  private engine: Stratagy<K, V>;

  constructor(engine: Stratagy<K, V>) {
    this.engine = engine;
  }

  get(key: K): V | undefined {
    return this.engine.get(key);
  }

  set(key: K, value: V): void {
    this.engine.set(key, value);
  }

  size(): number {
    return this.engine.size();
  }

  entries(): Array<[K, V]> {
    return this.engine.entries();
  }

  getCurrentInstance(): Map<K, V> {
    return this.engine.getCurrentInstance()
  }

  getValues(): V[] {
    return this.engine.getValues();
  }
}
