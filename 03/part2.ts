import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n").join("");

    const re = /(mul\((\d+),(\d+)\))|do\(\)|don't\(\)/g;
    let total = 0;

    let isAllowed = true;
    for (let match of lines.matchAll(re)) {
      if (match[0] == "do()") {
        isAllowed = true;
      } else if (match[0] == "don't()") {
        isAllowed = false;
      } else if (isAllowed) {
        total += Number(match[2]) * Number(match[3]);
      }
    }

    console.log(total);
  },
);
