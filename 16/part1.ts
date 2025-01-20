import fs from "fs";
import { Heap } from "heap-js";

type Coordinate = {
  x: number;
  y: number;
};

type Direction = {
  x: number;
  y: number;
};

type DirectionKeys = keyof typeof directions;

const directions: Record<"east" | "west" | "north" | "south", Direction> = {
  east: { x: 1, y: 0 },
  west: { x: -1, y: 0 },
  north: { x: 0, y: -1 },
  south: { x: 0, y: 1 },
};

function getKey(pos: Coordinate, dir: DirectionKeys): string {
  return `${pos.x},${pos.y},${dir}`;
}

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    const n = lines.length;
    const m = lines[0].length;

    let start: Coordinate = { x: 1, y: n - 2 };
    let end: Coordinate = { x: m - 2, y: 1 };

    const minHeap = new Heap<[Coordinate, DirectionKeys, number]>(
      (a, b) => a[2] - b[2],
    );
    minHeap.push([start, "east", 0]);

    const distances: Record<string, number> = {};
    const visited = new Set<string>();

    distances[getKey(start, "east")] = 0;

    while (!minHeap.isEmpty()) {
      const [position, looking, cost] = minHeap.pop()!;

      const positionKey = getKey(position, looking);
      if (visited.has(positionKey)) continue;
      visited.add(positionKey);

      if (position.x === end.x && position.y === end.y) {
        console.log(cost);
        return;
      }

      for (const direction of Object.keys(directions) as DirectionKeys[]) {
        const newPos = {
          x: directions[direction].x + position.x,
          y: directions[direction].y + position.y,
        };

        if (
          newPos.y < 0 ||
          newPos.y >= n ||
          newPos.x < 0 ||
          newPos.x >= m ||
          lines[newPos.y][newPos.x] === "#"
        ) {
          continue;
        }

        const newCost = cost + (direction === looking ? 1 : 1001);
        const newKey = getKey(newPos, direction);

        distances[newKey] = newCost;
        minHeap.push([newPos, direction, newCost]);
      }
    }

    console.log(Infinity);
  },
);
