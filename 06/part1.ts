import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

type Direction = "up" | "down" | "left" | "right";

const directions: Record<Direction, Coordinate> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const rightDir: Record<Direction, Direction> = {
  up: "right",
  right: "down",
  down: "left",
  left: "up",
};

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");

  let curPos: Coordinate = { x: 0, y: 0 };
  let curDir: Direction = "up";

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] == "^") {
        curPos = { x: j, y: i };
      }
    }
  }

  const visited = new Set<string>();

  while (true) {
    let nextPos = {
      x: curPos.x + directions[curDir].x,
      y: curPos.y + directions[curDir].y,
    };

    if (
      nextPos.x < 0 ||
      nextPos.x >= lines[0].length ||
      nextPos.y < 0 ||
      nextPos.y >= lines.length
    ) {
      visited.add(`${curPos.x},${curPos.y}`);
      break;
    } else if (lines[nextPos.y][nextPos.x] == "#") {
      curDir = rightDir[curDir];
    } else {
      visited.add(`${curPos.x},${curPos.y}`);
      curPos = nextPos;
    }
  }

  console.log(visited.size);
});
