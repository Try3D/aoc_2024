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

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    const seen = new Set<string>();

    let total = 0;

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        if (seen.has(`${j},${i}`)) {
          continue;
        }

        const stack: [string, Coordinate][] = [[lines[i][j], { x: j, y: i }]];

        let area = 0;
        let perimeter = 0;

        while (stack.length) {
          const [char, pos] = stack.pop()!;

          if (seen.has(`${pos.x},${pos.y}`)) {
            continue;
          }

          area++;

          seen.add(`${pos.x},${pos.y}`);

          for (let dir of directions) {
            const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };

            if (
              newPos.x < 0 ||
              newPos.x >= lines[0].length ||
              newPos.y < 0 ||
              newPos.y >= lines.length ||
              lines[newPos.y][newPos.x] != char
            ) {
              perimeter += 1;
            } else {
              stack.push([char, newPos]);
            }
          }
        }

        total += area * perimeter;
      }
    }

    console.log(total);
  },
);
