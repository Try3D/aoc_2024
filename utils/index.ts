function cache(fn: (...args: any[]) => any): (...args: any[]) => any {
  const memo = new Map<string, any>();
  return function (...args: any[]) {
    const key = JSON.stringify(args);
    if (memo.has(key)) {
      return memo.get(key);
    }
    const result = fn(...args);
    memo.set(key, result);
    return result;
  };
}

export { cache };
