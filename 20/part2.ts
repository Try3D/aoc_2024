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

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const ch = lines[y][x];
        if (ch === "S") {
          start = { x, y };
        } else if (ch === "E") {
          end = { x, y };
        }
      }
    }

    const dS = BFS(start, lines, width, height);
    const dE = BFS(end, lines, width, height);
    const best = dS[end.y][end.x];
    if (best === Infinity) {
      return;
    }

    const maxCheat = 20;
    const offsets: Coordinate[] = [];
    for (let dy = -maxCheat; dy <= maxCheat; dy++) {
      for (let dx = -maxCheat; dx <= maxCheat; dx++) {
        const manhattan = Math.abs(dx) + Math.abs(dy);
        if (manhattan >= 1 && manhattan <= maxCheat) {
          offsets.push({ x: dx, y: dy });
        }
      }
    }

    let count = 0;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (lines[y][x] === "#" || dS[y][x] === Infinity) continue;
        for (let offset of offsets) {
          const nx = x + offset.x;
          const ny = y + offset.y;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          if (lines[ny][nx] === "#" || dE[ny][nx] === Infinity) continue;

          const cheatTime = Math.abs(offset.x) + Math.abs(offset.y);
          const candidate = dS[y][x] + cheatTime + dE[ny][nx];
          const saving = best - candidate;
          if (saving >= 100) {
            count++;
          }
        }
      }
    }

    console.log(count);

    function BFS(
      start: Coordinate,
      grid: string[],
      width: number,
      height: number,
    ): number[][] {
      const dist: number[][] = Array.from({ length: height }, () =>
        Array(width).fill(Infinity),
      );
      const queue: Coordinate[] = [start];
      dist[start.y][start.x] = 0;
      while (queue.length) {
        const { x, y } = queue.shift()!;
        const d = dist[y][x];
        for (let dir of directions) {
          const nx = x + dir.x;
          const ny = y + dir.y;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          if (grid[ny][nx] === "#") continue;
          if (dist[ny][nx] > d + 1) {
            dist[ny][nx] = d + 1;
            queue.push({ x: nx, y: ny });
          }
        }
      }
      return dist;
    }
  },
);
