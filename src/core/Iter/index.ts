export function pipe<T>(value: T, ...fns: Array<(v: T) => T>): T {
  const jobs = [...fns];

  for (const job of jobs) {
    value = job(value);
  }

  return value;
}

export function compose<T>(...args: Array<(val: T) => T>): (val: T) => T {
  const stack = [...args];

  return function (value) {
    while (stack.length > 0) {
      const fn = stack.pop()!;
      value = fn(value);
    }

    return value;
  }
}

[...compose<Iterable<number>>(v => filter(v, (v) => v > 1))([1, 2, 3])]

export function filter<T>(i: Iterable<T>, pred: (val: T) => boolean): IterableIterator<T> {
  const innerIter = i[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return this;
    },

    next() {
      let chunk = innerIter.next();

      while (true) {
        if (chunk.done || pred(chunk.value)) {
          return chunk;
        }

        chunk = innerIter.next();
      }
    }
  }
}
