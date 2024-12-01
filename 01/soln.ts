import * as lib from "../lib";

lib.io.readFile("input.txt").then((data) => {
  const left = data.map((line) => Number(line.split(" ")[0]));
  const right = data.map((line) => Number(line.split(" ").at(-1)));

  const leftSort = [...left].sort((a, b) => a - b);
  const rightSort = [...right].sort((a, b) => a - b);

  let part1 = 0;
  for (let i = 0; i < leftSort.length; i++) {
    part1 += Math.abs(rightSort[i] - leftSort[i]);
  }

  const counter = right.reduce(
    (map, item) => map.set(item, (map.get(item) || 0) + 1),
    new Map(),
  );

  const part2 = data.reduce((sum, line) => {
    const num = Number(line.split(" ")[0]);
    const val = counter.get(num);
    return val ? sum + val * num : sum;
  }, 0);

  console.log("Part 1: " + part1);
  console.log("Part 2: " + part2);
});
