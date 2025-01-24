// @ts-check
import fs from "fs";

/** @typedef {{x: number, y: number}} Coordinate */

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");

  const regA = Number(lines[0].replace("Register A: ", ""));
  const regB = Number(lines[1].replace("Register B: ", ""));
  const regC = Number(lines[2].replace("Register C: ", ""));

  const prog = lines[4].replace("Program: ", "").split(',').map(Number);

  console.log(regA);
  console.log(regB);
  console.log(regC);
  console.log(prog);
});
