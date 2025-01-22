import fs from "fs";
import { Heap } from "heap-js";

const GRIDWIDTH = 70;

type Coordinate = {
  x: number;
  y: number;
};

const directions: Coordinate[] = [
  { x: 0, y: 1 },
  { x: 0, y: -1 },
  { x: 1, y: 0 },
  { x: -1, y: 0 },
];

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const cords = data
    .trim()
    .split("\n")
    .map((line) => line.split(",").map(Number));

  const grid = Array(GRIDWIDTH + 1)
    .fill(false)
    .map(() => Array(GRIDWIDTH + 1).fill(false));

  const start = { x: 0, y: 0 };
  const end = { x: GRIDWIDTH, y: GRIDWIDTH };

  for (let i = 0; i < cords.length; i++) {
    grid[cords[i][1]][cords[i][0]] = true;

    if (!aStar(start, end, grid)) {
      console.log(`${cords[i][0]},${cords[i][1]}`);
      break;
    }
  }
});

function aStar(start: Coordinate, end: Coordinate, grid: boolean[][]): boolean {
  const bestCosts = new Map<string, number>();
  const heap = new Heap<[number, number, Coordinate]>(
    (a, b) => a[0] + a[1] - (b[0] + b[1]),
  );

  heap.add([0, 0, start]);
  bestCosts.set(`${start.x},${start.y}`, 0);

  const heurestic = (cord: Coordinate) => {
    return Math.abs(cord.x - end.x) + Math.abs(cord.y - end.y);
  };

  while (!heap.isEmpty()) {
    const [pathCost, _, location] = heap.pop()!;

    if (pathCost > (bestCosts.get(`${location.x},${location.y}`) || Infinity)) {
      continue;
    }

    if (location.x === end.x && location.y === end.y) {
      return true;
    }

    for (const dir of directions) {
      const newLoc = { x: location.x + dir.x, y: location.y + dir.y };
      const newCost = pathCost + 1;

      if (
        newLoc.x < 0 ||
        newLoc.x >= grid[0].length ||
        newLoc.y < 0 ||
        newLoc.y >= grid.length ||
        grid[newLoc.y][newLoc.x]
      ) {
        continue;
      }

      if (newCost < (bestCosts.get(`${newLoc.x},${newLoc.y}`) || Infinity)) {
        bestCosts.set(`${newLoc.x},${newLoc.y}`, newCost);
        heap.add([newCost, heurestic(newLoc), newLoc]);
      }
    }
  }

  return false;
}
