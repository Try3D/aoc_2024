import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

type Robot = {
  pos: Coordinate;
  vel: Coordinate;
};

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim();

    const h = 103;
    const w = 101;

    const re = /p=([0-9-]*),([0-9-]*) v=([0-9-]*),([0-9-]*)/g;

    const robots: Robot[] = [];
    for (let match of lines.matchAll(re)) {
      robots.push({
        pos: { x: Number(match[1]), y: Number(match[2]) },
        vel: { x: Number(match[3]), y: Number(match[4]) },
      });
    }

    let bestTime = 0;
    let minVar = Infinity;

    for (let sec = 0; sec < h * w; sec++) {
      let eX = 0;
      let eY = 0;
      let e2X = 0;
      let e2Y = 0;

      for (let robot of robots) {
        let x = (robot.pos.x + sec * robot.vel.x) % w;
        let y = (robot.pos.y + sec * robot.vel.y) % h;

        if (x < 0) x += w;
        if (y < 0) y += h;

        eX += x;
        eY += y;
        e2X += x * x;
        e2Y += y * y;
      }

      eX /= robots.length;
      eY /= robots.length;

      const variance = e2X - eX * eX + e2Y - eY * eY;

      if (variance < minVar) {
        minVar = variance;
        bestTime = sec;
      }
    }

    robots.forEach((robot) => {
      robot.pos.x = (robot.pos.x + bestTime * robot.vel.x) % w;
      robot.pos.y = (robot.pos.y + bestTime * robot.vel.y) % h;

      if (robot.pos.x < 0) robot.pos.x += w;
      if (robot.pos.y < 0) robot.pos.y += h;
    });

    console.log(`<--------- MIN VARIANCE: ${bestTime} --------->`);

    var arr = Array(h)
      .fill(null)
      .map((_) => Array(w).fill("."));

    for (let robot of robots) {
      arr[robot.pos.y][robot.pos.x] = "#";
    }

    for (let i = 0; i < h; i++) {
      console.log(arr[i].join(""));
    }
  },
);
