import * as lib from "../lib";

lib.io.readFile("input.txt").then((data) => {
  const l = data.map((line) => Number(line.split(" ")[0]));
  const r = data.map((line) => Number(line.split(" ").at(-1)));

  const lSort = l.sort((a, b) => a - b);
  const rSort = r.sort((a, b) => a - b);

  const counter = r.reduce((m, i) => m.set(i, (m.get(i) || 0) + 1), new Map());

  const part1 = lSort.reduce((sum, l, i) => sum + Math.abs(rSort[i] - l), 0);
  const part2 = l.reduce((sum, n) => sum + (counter.get(n) || 0) * n, 0);

  console.log("Part 1: " + part1);
  console.log("Part 2: " + part2);
});
