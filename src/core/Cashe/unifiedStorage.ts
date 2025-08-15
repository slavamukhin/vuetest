export interface UnifiedStorageOptions<T> {
  storage: Storage;
  ttl?: number;
}

function replacer(key: string, value: any) {
  if (value instanceof Map) {
    return { __type: 'Map', value: Array.from(value.entries()) };
  }
  if (value instanceof Set) {
    return { __type: 'Set', value: Array.from(value.values()) };
  }
  return value;
}

function reviver(key: string, value: any) {
  if (value?.__type === 'Map') return new Map(value.value);
  if (value?.__type === 'Set') return new Set(value.value);
  return value;
}

function createUnifiedStorage<T>(options: UnifiedStorageOptions<T>) {
  const { storage, ttl } = options;

  const serialize = (value: T) => {
    console.log('serialize');
    const data = { value, timestamp: Date.now() };
    return JSON.stringify(data, replacer);
  };

  const deserialize = (raw: string | null): T | null => {
    console.log('deserialize')
    if (!raw) return null;
    try {
      const data = JSON.parse(raw, reviver);
      if (ttl && Date.now() - data.timestamp > ttl) {
        console.log('Данные устарели');
        return null;
      }
      return data.value as T;
    } catch {
      return null;
    }
  };

  const save = (key: string, value: T) => storage.setItem(key, serialize(value));
  const load = (key: string): T | null => deserialize(storage.getItem(key));
  const remove = (key: string) => storage.removeItem(key);

  return { serialize, deserialize, save, load, remove };
}

const minute = 60_000;
export const localStorageTTL = createUnifiedStorage({ storage: localStorage, ttl: minute * 10 });
export const wrapperLocalStorage = createUnifiedStorage({ storage: localStorage });
