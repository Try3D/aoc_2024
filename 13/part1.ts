import fs from "fs";

type Coordinate = {
  x: number;
  y: number;
};

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");

  const buttonReg = /Button \w: X\+(\d*), Y\+(\d*)/g;
  const prizeReg = /Prize: X\=(\d*), Y\=(\d*)/g;

  let total = 0;
  for (let i = 0; i < lines.length; i += 4) {
    const btnA: Coordinate = { x: 0, y: 0 };
    for (let match of lines[i].matchAll(buttonReg)) {
      btnA.x = Number(match[1]);
      btnA.y = Number(match[2]);
    }

    const btnB: Coordinate = { x: 0, y: 0 };
    for (let match of lines[i + 1].matchAll(buttonReg)) {
      btnB.x = Number(match[1]);
      btnB.y = Number(match[2]);
    }

    const prize: Coordinate = { x: 0, y: 0 };
    for (let match of lines[i + 2].matchAll(prizeReg)) {
      prize.x = Number(match[1]);
      prize.y = Number(match[2]);
    }

    const d = btnA.x * btnB.y - btnA.y * btnB.x;
    const dA = prize.x * btnB.y - prize.y * btnB.x;
    const dB = btnA.x * prize.y - btnA.y * prize.x;

    if (d != 0) {
      const a = dA / d;
      const b = dB / d;

      if (Number.isInteger(a) && Number.isInteger(b) && a >= 0 && b >= 0) {
        total += (3 * dA) / d + (1 * dB) / d;
      }
    }
  }

  console.log(total);
});
