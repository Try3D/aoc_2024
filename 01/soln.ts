import * as lib from "../lib";

lib.io.readFile("input.txt").then((data) => {
  const l = data.map((line) => Number(line.split("   ")[0]));
  const r = data.map((line) => Number(line.split("   ")[1]));

  const lSort = l.sort((a, b) => a - b);
  const rSort = r.sort((a, b) => a - b);

  const counter = new lib.collections.Counter(r);

  const part1 = lSort.reduce((sum, l, i) => sum + Math.abs(rSort[i] - l), 0);
  const part2 = l.reduce((sum, n) => sum + (counter.get(n)) * n, 0);

  console.log("Part 1: " + part1);
  console.log("Part 2: " + part2);
});
