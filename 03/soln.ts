import * as lib from "../lib";

lib.io.readFile("input.txt").then((data) => {
  const input = data.join("");

  let part2 = 0;

  const regex = /(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;

  let enabled = true;

  input.matchAll(regex).forEach((match) => {
    const instruction = match[1];

    if (instruction === "do()") {
      enabled = true;
    } else if (instruction === "don't()") {
      enabled = false;
    } else if (enabled) {
      part2 += parseInt(match[2]) * parseInt(match[3]);
    }
  });

  console.log(part2);
});
