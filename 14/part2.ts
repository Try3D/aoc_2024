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

    let minSafety = Infinity;
    let bestTime = 0;

    for (let sec = 0; sec < h * w; sec++) {
      let q1 = 0;
      let q2 = 0;
      let q3 = 0;
      let q4 = 0;

      for (let robot of robots) {
        let x = (robot.pos.x + sec * robot.vel.x) % w;
        let y = (robot.pos.y + sec * robot.vel.y) % h;

        if (x < 0) x += w;
        if (y < 0) y += h;

        if (x > wMid && y < hMid) q1++;
        else if (x > wMid && y > hMid) q2++;
        else if (x < wMid && y > hMid) q3++;
        else if (x < wMid && y < hMid) q4++;
      }

      const safetyScore = q1 * q2 * q3 * q4;
      if (safetyScore < minSafety) {
        minSafety = safetyScore;
        bestTime = sec;
      }
    }

    robots.forEach((robot) => {
      robot.pos.x = (robot.pos.x + bestTime * robot.vel.x) % w;
      robot.pos.y = (robot.pos.y + bestTime * robot.vel.y) % h;

      if (robot.pos.x < 0) robot.pos.x += w;
      if (robot.pos.y < 0) robot.pos.y += h;
    });

    console.log(`<--------- HIGHEST SAFETY SCORE: ${bestTime} --------->`);
    for (let i = 0; i < h; i++) {
      let out = "";
      for (let j = 0; j < w; j++) {
        out += isOccupied(j, i) ? "#" : ".";
      }
      console.log(out);
    }

    function isOccupied(x: number, y: number): boolean {
      for (let robot of robots) {
        if (robot.pos.x === x && robot.pos.y === y) {
          return true;
        }
      }

      return false;
    }
  },
);
