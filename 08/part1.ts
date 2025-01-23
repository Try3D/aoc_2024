import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    const map = new Map<string, Coordinate[]>();

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] != ".") {
          map.set(lines[i][j], [
            { x: j, y: i },
            ...(map.get(lines[i][j]) || []),
          ]);
        }
      }
    }

    const set = new Set<string>();

    for (const v of map.values()) {
      for (let i = 0; i < v.length; i++) {
        for (let j = i + 1; j < v.length; j++) {
          const diff = {
            x: v[j].x - v[i].x,
            y: v[j].y - v[i].y,
          };

          const n1 = {
            x: v[i].x - diff.x,
            y: v[i].y - diff.y,
          };

          const n2 = {
            x: v[j].x + diff.x,
            y: v[j].y + diff.y,
          };

          if (
            n1.x >= 0 &&
            n1.x < lines[0].length &&
            n1.y >= 0 &&
            n1.y < lines.length
          ) {
            set.add(`${n1.x},${n1.y}`);
          }

          if (
            n2.x >= 0 &&
            n2.x < lines[0].length &&
            n2.y >= 0 &&
            n2.y < lines.length
          ) {
            set.add(`${n2.x},${n2.y}`);
          }
        }
      }
    }

    console.log(set.size);
  },
);
