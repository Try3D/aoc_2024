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
    const height = lines.length;
    const width = lines[0].length;

    let start: Coordinate = { x: 0, y: 0 };
    let end: Coordinate = { x: 0, y: 0 };

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (lines[i][j] === "S") {
          start.x = j;
          start.y = i;
        } else if (lines[i][j] === "E") {
          end.x = j;
          end.y = i;
        }
      }
    }

    const res = BFS(0, 0);
    let total = 0;
    for (let i = 1; i < height - 1; i++) {
      for (let j = 1; j < width - 1; j++) {
        if (lines[i][j] === "#") {
          if (res - BFS(j, i) >= 100) {
            total += 1;
          }
        }
      }
    }
    console.log(total);

    function BFS(x: number, y: number): number {
      let queue: Coordinate[] = [start];
      const seen = new Set<string>();
      let count = 0;

      while (queue.length) {
        const newQueue: Coordinate[] = [];

        for (let item of queue) {
          if (seen.has(`${item.x},${item.y}`)) {
            continue;
          } else if (item.x === end.x && item.y === end.y) {
            return count;
          }

          seen.add(`${item.x},${item.y}`);

          for (let direction of directions) {
            const newPos = {
              x: item.x + direction.x,
              y: item.y + direction.y,
            };

            if (
              newPos.x < 0 ||
              newPos.x >= width ||
              newPos.y < 0 ||
              newPos.y >= height ||
              seen.has(`${newPos.x},${newPos.y}`) ||
              (lines[newPos.y][newPos.x] === "#" &&
                !(newPos.x === x && newPos.y === y))
            ) {
              continue;
            }

            newQueue.push(newPos);
          }
        }

        queue = newQueue;
        count += 1;
      }

      return Infinity;
    }
  },
);
