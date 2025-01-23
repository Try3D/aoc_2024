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

          const n1 = { ...v[i] };
          const n2 = { ...v[j] };

          while (
            n1.x >= 0 &&
            n1.x < lines[0].length &&
            n1.y >= 0 &&
            n1.y < lines.length
          ) {
            set.add(`${n1.x},${n1.y}`);
            n1.x -= diff.x;
            n1.y -= diff.y;
          }

          while (
            n2.x >= 0 &&
            n2.x < lines[0].length &&
            n2.y >= 0 &&
            n2.y < lines.length
          ) {
            set.add(`${n2.x},${n2.y}`);
            n2.x += diff.x;
            n2.y += diff.y;
          }
        }
      }
    }

    console.log(set.size);
  },
);
