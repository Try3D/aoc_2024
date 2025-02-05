import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

const dirMapping: Record<string, Coordinate> = {
  ">": { x: 0, y: 1 },
  "<": { x: 0, y: -1 },
  v: { x: 1, y: 0 },
  "^": { x: -1, y: 0 },
};

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const [map, movesStr] = data.trim().split("\n\n");

    const grid = map.split("\n");
    const moves = movesStr
      .replaceAll("\n", "")
      .split("")
      .map((m) => dirMapping[m]);

    let walls = new Set<string>();
    let boxes = new Set<string>();
    let robot: Coordinate | null = null;

    for (let i = 0; i < grid.length; i++) {
      const line = grid[i];
      for (let j = 0; j < line.length; j++) {
        const ch = line[j];
        const col = j * 2;
        if (ch === "#") {
          walls.add(`${i},${col}`);
          walls.add(`${i},${col + 1}`);
        }
        if (ch === "O") {
          boxes.add(`${i},${col}`);
        }
        if (ch === "@") {
          robot = { x: i, y: col };
        }
      }
    }

    for (const move of moves) {
      if (!robot) break;
      const nxt = addt(robot, move);

      if (walls.has(`${nxt.x},${nxt.y}`)) {
        continue;
      }

      if (boxes.has(`${nxt.x},${nxt.y}`)) {
        const copy = new Set(boxes);
        if (!push(nxt, move)) {
          boxes = copy;
          continue;
        }
      } else if (boxes.has(`${left(nxt).x},${left(nxt).y}`)) {
        const copy = new Set(boxes);
        if (!push(left(nxt), move)) {
          boxes = copy;
          continue;
        }
      }
      robot = nxt;
    }

    let total = 0;
    boxes.forEach((boxStr) => {
      const [x, y] = boxStr.split(",").map(Number);
      total += 100 * x + y;
    });

    console.log(total);

    function addt(a: Coordinate, b: Coordinate): Coordinate {
      return { x: a.x + b.x, y: a.y + b.y };
    }

    function left(pos: Coordinate): Coordinate {
      return { x: pos.x, y: pos.y - 1 };
    }

    function right(pos: Coordinate): Coordinate {
      return { x: pos.x, y: pos.y + 1 };
    }

    function push(box: Coordinate, d: Coordinate): boolean {
      const boxKey = `${box.x},${box.y}`;
      if (!boxes.has(boxKey)) return false;
      const nxt = addt(box, d);
      const nxtKey = `${nxt.x},${nxt.y}`;
      if (walls.has(nxtKey) || walls.has(`${right(nxt).x},${right(nxt).y}`))
        return false;

      if (d.x !== 0) {
        if (boxes.has(nxtKey)) {
          if (!push(nxt, d)) return false;
        }
        if (boxes.has(`${left(nxt).x},${left(nxt).y}`)) {
          if (!push(left(nxt), d)) return false;
        }
        if (boxes.has(`${right(nxt).x},${right(nxt).y}`)) {
          if (!push(right(nxt), d)) return false;
        }
      }
      if (d.y === 1) {
        if (boxes.has(`${right(nxt).x},${right(nxt).y}`)) {
          if (!push(right(nxt), d)) return false;
        }
      }
      if (d.y === -1) {
        if (boxes.has(`${left(nxt).x},${left(nxt).y}`)) {
          if (!push(left(nxt), d)) return false;
        }
      }
      boxes.delete(boxKey);
      boxes.add(nxtKey);
      return true;
    }
  },
);
