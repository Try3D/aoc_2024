import fs from "fs";

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

function getDigits(x: number): number {
  let count = 1;
  while (x >= 10) {
    x = Math.floor(x / 10);
    count += 1;
  }
  return count;
}

const getCount = cache(function (x: number, iter: number): number {
  if (iter === 0) {
    return 1;
  }

  if (x === 0) {
    return getCount(1, iter - 1);
  }

  const digitCount = getDigits(x);
  if (digitCount % 2 === 0) {
    const half = digitCount / 2;
    const divisor = Math.pow(10, half);
    const firstHalf = Math.floor(x / divisor);
    const secondHalf = x % divisor;

    return getCount(firstHalf, iter - 1) + getCount(secondHalf, iter - 1);
  } else {
    return getCount(x * 2024, iter - 1);
  }
});

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const nums = data.trim().split(" ").map(Number);

    let total = 0;
    for (let n of nums) {
      total += getCount(n, 25);
    }
    console.log(total);
  },
);
