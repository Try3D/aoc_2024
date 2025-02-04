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
      if (backtrack(design)) {
        total += 1;
      }
    }
    console.log(total);

    function backtrack(remaining: string, memo = new Map()): boolean {
      if (memo.has(remaining)) {
        return memo.get(remaining);
      }

      if (remaining === "") {
        return true;
      }

      for (let towel of towels) {
        if (remaining.startsWith(towel)) {
          if (backtrack(remaining.slice(towel.length), memo)) {
            memo.set(remaining, true);
            return true;
          }
        }
      }

      memo.set(remaining, false);
      return false;
    }
  },
);
