import fs from "fs";
import { Heap } from "heap-js";

type Coordinate = {
  x: number;
  y: number;
};

type Item = [Coordinate, string, number];

const directions: Record<string, Coordinate> = {
  N: { x: 0, y: -1 },
  S: { x: 0, y: 1 },
  W: { x: -1, y: 0 },
  E: { x: 1, y: 0 },
};

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    let start = { x: 1, y: lines.length - 2 };
    let end = { x: lines[0].length - 2, y: 1 };

    const facing = "E";

    const visited = new Set<string>();

    const q = new Heap((a: Item, b: Item) => a[2] - b[2]);
    q.add([start, facing, 0]);

    while (!q.isEmpty()) {
      const [pos, dir, cost] = q.pop()!;

      if (visited.has(`${pos.x},${pos.y},${dir}`)) {
        continue;
      }
      visited.add(`${pos.x},${pos.y},${dir}`);

      if (pos.x === end.x && pos.y === end.y) {
        console.log(cost);
        break;
      }

      for (let key of Object.keys(directions)) {
        const newPos = {
          x: pos.x + directions[key].x,
          y: pos.y + directions[key].y,
        };

        if (
          visited.has(`${newPos.x},${newPos.y},${key}`) ||
          newPos.x < 0 ||
          newPos.x >= lines[0].length ||
          newPos.y < 0 ||
          newPos.y >= lines.length ||
          lines[newPos.y][newPos.x] === "#"
        ) {
          continue;
        }

        q.add([newPos, key, cost + (dir === key ? 1 : 1001)]);
      }
    }
  },
);
