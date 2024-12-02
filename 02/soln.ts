import * as lib from "../lib";

lib.io.readFile("input.txt").then((data) => {
  let part1 = 0;
  let part2 = 0;

  data.forEach((line) => {
    const nums = line.split(" ").map(Number);

    if (isSafe(nums)) {
      part1++;
      part2++;
    } else if (nums.some((_, i) => isSafe([...nums.slice(0, i), ...nums.slice(i + 1)]))) {
      part2++;
    }
  });

  console.log("Part1:", part1);
  console.log("Part2:", part2);
});

function isSafe(nums: number[]) {
  const diffs = nums.slice(1).map((n, i) => n - nums[i]);

  const inc = diffs.every((d) => d >= 1 && d <= 3);
  const dec = diffs.every((d) => d <= -1 && d >= -3);

  return inc || dec;
}
