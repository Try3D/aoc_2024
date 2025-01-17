import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n").join("");

    let total = 0;
    for (let match of lines.matchAll(/mul\((\d+),(\d+)\)/g)) {
      total += parseInt(match[2]) * parseFloat(match[1]);
    }

    console.log(total);
  },
);
