import fs from "fs";

type Point = {
  x: number;
  y: number;
};

const directions: Point[] = [
  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: 1, y: -1 },
  { x: -1, y: -1 },
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
];

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    let total = 0;

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        for (let dir of directions) {
          try {
            if (
              lines[i][j] == "X" &&
              lines[i + dir.y][j + dir.x] == "M" &&
              lines[i + dir.y * 2][j + dir.x * 2] == "A" &&
              lines[i + dir.y * 3][j + dir.x * 3] == "S"
            ) {
              total += 1;
            }
          } catch {
            continue;
          }
        }
      }
    }

    console.log(total);
  },
);
