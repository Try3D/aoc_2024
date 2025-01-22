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

  let total = 0;

  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] == ".") {
        if (checkLoop(lines, { x: j, y: i }, curPos, curDir)) {
          total++;
        }
      }
    }
  }

  console.log(total);
});

function checkLoop(
  lines: string[],
  newWall: Coordinate,
  curPos: Coordinate,
  curDir: Direction,
): boolean {
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
      return false;
    } else if (visited.has(`${nextPos.x},${nextPos.y},${curDir}`)) {
      return true;
    } else if (
      lines[nextPos.y][nextPos.x] == "#" ||
      (newWall.x == nextPos.x && newWall.y == nextPos.y)
    ) {
      curDir = rightDir[curDir];
    } else {
      visited.add(`${nextPos.x},${nextPos.y},${curDir}`);
      curPos = nextPos;
    }
  }
}
