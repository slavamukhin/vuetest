import { describe, it, beforeEach, expect } from 'vitest';
import { LRU } from './lru';
import { Cashe } from '../Cashe';

describe('LRU cashe', () => {
  let lruChache: Cashe<string, number>;

  beforeEach(() => {
    lruChache = new Cashe<string, number>(new LRU(3));
  });

  //  самый новый элемент к которому было обращение get или set, ставится в конец, при переполнении удаляется первый.
  it('Проверка алгоритма LRU, set, get', () => {
    expect(lruChache.get('a')).toBeUndefined();
    lruChache.set('a', 1); // ['a']
    lruChache.set('b', 2); // ['a', 'b']
    expect(lruChache.get('a')).toBe(1); // ['b', 'a']
    lruChache.set('c', 3); // ['b', 'a', 'c']
    lruChache.set('d', 4); // ['a', 'c', 'd']
    expect(lruChache.get('b')).toBeUndefined();
    expect(lruChache.get('d')).toBe(4); // ['a', 'c', 'd']
    expect(lruChache.get('c')).toBe(3); // ['a', 'd', 'c']
    expect(lruChache.get('a')).toBe(1); // ['d', 'c', 'a']
    lruChache.set('f', 5); // ['c', 'a', 'f']
    expect(lruChache.get('d')).toBeUndefined();
    expect(lruChache.get('f')).toBe(5); // ['c', 'a', 'f']
  });

  it('Проверка size', () => {
    lruChache.set('a', 1); // ['a']
    lruChache.set('b', 2); // ['a', 'b']
    lruChache.set('c', 3); // ['a', 'b', 'c']
    expect(lruChache.size()).toBe(3);
    lruChache.set('d', 4); // ['b', 'c', 'd']
    expect(lruChache.size()).toBe(3);
    expect(lruChache.get('a')).toBeUndefined();
  })
})
