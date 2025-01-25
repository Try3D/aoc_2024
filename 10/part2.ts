import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

const directions: Coordinate[] = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");

  const zeros: Coordinate[] = [];
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] == "0") {
        zeros.push({ x, y });
      }
    }
  }

  let total = 0;

  for (let pos of zeros) {
    const stack: [number, Coordinate][] = [];
    stack.push([0, pos]);

    while (stack.length > 0) {
      const [val, loc] = stack.pop()!;

      for (let dir of directions) {
        const newPos = { x: loc.x + dir.x, y: loc.y + dir.y };

        if (
          newPos.x < 0 ||
          newPos.x >= lines[0].length ||
          newPos.y < 0 ||
          newPos.y >= lines.length ||
          Number(lines[newPos.y][newPos.x]) !== val + 1
        ) {
          continue;
        }

        if (lines[newPos.y][newPos.x] === "9") {
          total += 1;
          continue;
        }

        stack.push([val + 1, newPos]);
      }
    }
  }

  console.log(total);
});
