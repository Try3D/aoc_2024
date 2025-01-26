import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

const directions = [
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 1, y: 0 },
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

        const stack: Coordinate[] = [{ x: j, y: i }];

        let area = 0;
        let sides = 0;

        while (stack.length) {
          const pos = stack.pop()!;

          if (seen.has(`${pos.x},${pos.y}`)) {
            continue;
          }

          area++;

          seen.add(`${pos.x},${pos.y}`);

          const c = lines[pos.y][pos.x];

          const up = gridVal(pos.y - 1, pos.x);
          const down = gridVal(pos.y + 1, pos.x);
          const left = gridVal(pos.y, pos.x - 1);
          const right = gridVal(pos.y, pos.x + 1);
          const upLeft = gridVal(pos.y - 1, pos.x - 1);
          const upRight = gridVal(pos.y - 1, pos.x + 1);
          const downRight = gridVal(pos.y + 1, pos.x + 1);
          const downLeft = gridVal(pos.y + 1, pos.x - 1);

          let corners = 0;

          if (up !== c && right !== c) corners++;
          if (right !== c && down !== c) corners++;
          if (down !== c && left !== c) corners++;
          if (left !== c && up !== c) corners++;

          if (upLeft !== c && up === c && left === c) corners++;
          if (upRight !== c && up === c && right === c) corners++;
          if (downRight !== c && down === c && right === c) corners++;
          if (downLeft !== c && down === c && left === c) corners++;

          sides += corners;

          for (const dir of directions) {
            const newPos = { x: pos.x + dir.x, y: pos.y + dir.y };

            if (
              newPos.y >= 0 &&
              newPos.y < lines.length &&
              newPos.x >= 0 &&
              newPos.x < lines[0].length &&
              !seen.has(`${newPos.x},${newPos.y}`) &&
              lines[newPos.y][newPos.x] === c
            ) {
              stack.push({ x: newPos.x, y: newPos.y });
            }
          }
        }

        total += area * sides;
      }
    }

    console.log(total);

    function gridVal(y: number, x: number): string {
      if (y >= 0 && y < lines.length && x >= 0 && x < lines[0].length) {
        return lines[y][x];
      } else {
        return " ";
      }
    }
  },
);
