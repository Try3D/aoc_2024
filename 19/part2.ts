import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    const towels = lines[0].split(", ");
    const designs = lines.slice(2);

    let total = 0;
    for (let design of designs) {
      total += backtrack(design);
    }
    console.log(total);

    function backtrack(remaining: string, memo = new Map()): number {
      if (memo.has(remaining)) {
        return memo.get(remaining);
      }

      if (remaining === "") {
        return 1;
      }

      let count = 0;
      for (let towel of towels) {
        if (remaining.startsWith(towel)) {
          count += backtrack(remaining.slice(towel.length), memo);
        }
      }

      memo.set(remaining, count);
      return count;
    }
  },
);
