import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

const directions: Record<string, Coordinate> = {
  "^": { x: 0, y: -1 },
  v: { x: 0, y: 1 },
  ">": { x: 1, y: 0 },
  "<": { x: -1, y: 0 },
};

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const [map, moves] = data.trim().split("\n\n");

    const grid = map.split("\n").map((s) => s.split(""));
    const actions = moves.replaceAll("\n", "");

    let pos: Coordinate = { x: 0, y: 0 };

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === "@") {
          pos = { x, y };
          grid[y][x] = ".";
          break;
        }
      }
    }

    for (const action of actions) {
      const move = directions[action];
      const newPos = {
        x: pos.x + move.x,
        y: pos.y + move.y,
      };

      if (grid[newPos.y][newPos.x] === ".") {
        pos = newPos;
      } else if (grid[newPos.y][newPos.x] === "O") {
        let current = { x: newPos.x + move.x, y: newPos.y + move.y };
        let boxes = 0;

        while (true) {
          if (grid[current.y][current.x] === "O") {
            current.x += move.x;
            current.y += move.y;
            boxes++;
          } else if (grid[current.y][current.x] === ".") {
            const targetCell = { x: current.x, y: current.y };

            let temp = { x: targetCell.x, y: targetCell.y };
            for (let i = 0; i < boxes + 1; i++) {
              const prev = { x: temp.x - move.x, y: temp.y - move.y };
              grid[temp.y][temp.x] = "O";
              grid[prev.y][prev.x] = ".";
              temp = prev;
            }

            pos = newPos;
            break;
          } else {
            break;
          }
        }
      }
    }

    let total = 0;
    for (let i = 1; i < grid.length; i++) {
      for (let j = 1; j < grid[0].length; j++) {
        if (grid[i][j] === "O") {
          total += 100 * i + j;
        }
      }
    }

    console.log(total);
  },
);
