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
  return `${pos.y},${pos.x},${dir}`;
}

const directionOrder: DirectionKeys[] = ["north", "east", "south", "west"];

function getNextDirection(
  current: DirectionKeys,
  clockwise: boolean,
): DirectionKeys {
  const currentIndex = directionOrder.indexOf(current);
  const nextIndex = (currentIndex + (clockwise ? 1 : -1) + 4) % 4;
  return directionOrder[nextIndex];
}

function getOppositeDirection(dir: DirectionKeys): DirectionKeys {
  const opposites: Record<DirectionKeys, DirectionKeys> = {
    north: "south",
    south: "north",
    east: "west",
    west: "east",
  };
  return opposites[dir];
}

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    const n = lines.length;
    const m = lines[0].length;

    let start: Coordinate = { x: 1, y: lines.length - 2 };
    let end: Coordinate = { x: lines[0].length - 2, y: 1 };

    const queue = new Heap<[number, Coordinate, DirectionKeys]>(
      (a, b) => a[0] - b[0],
    );
    const seen = new Set<string>();
    queue.push([0, { x: start.x, y: start.y }, "east"]);
    const dist = new Map<string, number>();
    let best: number | null = null;

    while (!queue.isEmpty()) {
      const [d, pos, dir] = queue.pop()!;
      const key = getKey(pos, dir);

      if (!dist.has(key)) {
        dist.set(key, d);
      }
      if (pos.x === end.x && pos.y === end.y && best === null) {
        best = d;
      }
      if (seen.has(key)) {
        continue;
      }

      seen.add(key);
      const currentDir = directions[dir];
      const newPos: Coordinate = {
        x: pos.x + currentDir.x,
        y: pos.y + currentDir.y,
      };

      if (
        0 <= newPos.x &&
        newPos.x < n &&
        0 <= newPos.y &&
        newPos.y < m &&
        lines[newPos.y][newPos.x] !== "#"
      ) {
        queue.push([d + 1, newPos, dir]);
      }
      queue.push([d + 1000, pos, getNextDirection(dir, true)]);
      queue.push([d + 1000, pos, getNextDirection(dir, false)]);
    }

    const queue2 = new Heap<[number, Coordinate, DirectionKeys]>(
      (a, b) => a[0] - b[0],
    );
    const seen2 = new Set<string>();

    for (const dir of directionOrder) {
      queue2.push([0, { x: end.x, y: end.y }, dir]);
    }
    const dist2 = new Map<string, number>();

    while (!queue2.isEmpty()) {
      const [d, pos, dir] = queue2.pop()!;
      const key = getKey(pos, dir);

      if (!dist2.has(key)) {
        dist2.set(key, d);
      }
      if (seen2.has(key)) {
        continue;
      }

      seen2.add(key);
      const oppositeDir = getOppositeDirection(dir);
      const currentDir = directions[oppositeDir];
      const newPos: Coordinate = {
        x: pos.x + currentDir.x,
        y: pos.y + currentDir.y,
      };

      if (
        0 <= newPos.x &&
        newPos.x < n &&
        0 <= newPos.y &&
        newPos.y < m &&
        lines[newPos.y][newPos.x] !== "#"
      ) {
        queue2.push([d + 1, newPos, dir]);
      }
      queue2.push([d + 1000, pos, getNextDirection(dir, true)]);
      queue2.push([d + 1000, pos, getNextDirection(dir, false)]);
    }

    const validPositions = new Set<string>();
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < m; x++) {
        for (const dir of directionOrder) {
          const key = getKey({ x, y }, dir);
          if (dist.has(key) && dist2.has(key)) {
            if (dist.get(key)! + dist2.get(key)! === best) {
              validPositions.add(`${y},${x}`);
            }
          }
        }
      }
    }

    console.log(validPositions.size);
  },
);
