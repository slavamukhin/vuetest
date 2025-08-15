import type { FIFO } from './stratagy/fifo';
import type { LFU } from './stratagy/lfu';
import type { LRU } from './stratagy/lru';
import type { MRU } from './stratagy/mru';
import type { Q2 } from './stratagy/2q';
import type { ARC } from './stratagy/arc'
import type { RR } from './stratagy/rr';
import type { TTL } from './stratagy/tll';

export type Stratagy<K, V> = MRU<K, V> | LRU<K, V> | LFU<K, V> | FIFO<K, V> | Q2<K, V> | ARC<K, V> | RR<K, V> | TTL<K, V>;

export interface ICashe<K, V> {
  get(value: K): V | undefined;
  set(key: K, value: V): void;
  size(): number;
  entries(): Array<[K, V]>;
  getCurrentInstance(): Map<K, V>;
  getValues(): V[]
}
