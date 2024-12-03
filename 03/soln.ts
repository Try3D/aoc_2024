import * as lib from "../lib";

lib.io.readFile("input.txt").then((data) => {
  const input = data.join("");

  let part1 = 0;
  let part2 = 0;

  const regex = /(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;

  let enabled = true;

  input.matchAll(regex).forEach((match) => {
    const instruction = match[1];

    if (instruction === "do()") {
      enabled = true;
    } else if (instruction === "don't()") {
      enabled = false;
    } else {
      let product = parseInt(match[2]) * parseInt(match[3]);  
      if (enabled) {
        part2 += product;
      }
      part1 += product;
    }
  });

  console.log("Part 1:", part1);
  console.log("Part 2:", part2);
});
