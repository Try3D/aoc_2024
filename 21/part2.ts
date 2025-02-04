import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const nums = data.trim().split("\n").map(BigInt);

    const sequences = new Map<string, number>();

    for (let num of nums) {
      const { values, previous } = getVals(num);
      const buyerMap = new Map<string, number>();

      for (let j = 0; j <= previous.length - 4; j++) {
        const c1 = previous[j];
        const c2 = previous[j + 1];
        const c3 = previous[j + 2];
        const c4 = previous[j + 3];
        const key = `${c1},${c2},${c3},${c4}`;

        const price = values[j + 4];

        if (!buyerMap.has(key)) {
          buyerMap.set(key, price);
        }
      }

      buyerMap.forEach((price, key) => {
        sequences.set(key, (sequences.get(key) || 0) + price);
      });
    }

    let maxBananas = -Infinity;
    sequences.forEach((total) => {
      if (total > maxBananas) {
        maxBananas = total;
      }
    });
    console.log(maxBananas);
  },
);

function getVals(n: bigint) {
  const values: number[] = [];
  const previous: number[] = [];
  const ten = BigInt(10);

  for (let i = 0; i < 2000; i++) {
    const currentPrice = Number(n % ten);
    values.push(currentPrice);
    const nextN = mod(n);
    const nextPrice = Number(nextN % ten);
    const change = nextPrice - currentPrice;
    previous.push(change);
    n = nextN;
  }

  values.push(Number(n % ten));

  return { values, previous };
}

function mod(secret: bigint): bigint {
  secret = (secret ^ (secret * BigInt(64))) % BigInt(16777216);
  secret = (secret ^ (secret / BigInt(32))) % BigInt(16777216);
  secret = (secret ^ (secret * BigInt(2048))) % BigInt(16777216);
  return secret;
}
