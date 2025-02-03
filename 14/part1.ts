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
    const wMid = Math.floor(w / 2);
    const hMid = Math.floor(h / 2);

    const re = /p=([0-9-]*),([0-9-]*) v=([0-9-]*),([0-9-]*)/g;

    const robots: Robot[] = [];
    for (let match of lines.matchAll(re)) {
      robots.push({
        pos: { x: Number(match[1]), y: Number(match[2]) },
        vel: { x: Number(match[3]), y: Number(match[4]) },
      });
    }

    robots.forEach((robot) => {
      robot.pos.x = (robot.pos.x + 100 * robot.vel.x) % w;
      robot.pos.y = (robot.pos.y + 100 * robot.vel.y) % h;

      if (robot.pos.x < 0) robot.pos.x += w;
      if (robot.pos.y < 0) robot.pos.y += h;
    });

    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;

    for (let robot of robots) {
      if (robot.pos.x > wMid && robot.pos.y < hMid) {
        q1 += 1;
      } else if (robot.pos.x > wMid && robot.pos.y > hMid) {
        q2 += 1;
      } else if (robot.pos.x < wMid && robot.pos.y > hMid) {
        q3 += 1;
      } else if (robot.pos.x < wMid && robot.pos.y < hMid) {
        q4 += 1;
      }
    }

    console.log(q1 * q2 * q3 * q4);
  },
);
