import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    const lefts: number[] = [];
    const rights: number[] = [];

    lines.map((line) => {
      lefts.push(parseInt(line.split("   ")[0]));
      rights.push(parseInt(line.split("   ")[1]));
    });

    lefts.sort((a, b) => a - b);
    rights.sort((a, b) => a - b);

    let total = 0;
    for (let i = 0; i < lefts.length; i++) {
      total += Math.abs(lefts[i] - rights[i]);
    }

    console.log(total);
  },
);
