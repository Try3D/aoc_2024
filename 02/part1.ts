import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    let total = 0;
    lines.map((line) => {
      const nums = line.split(" ").map(parseFloat);
      if (isSafe(nums)) {
        total += 1;
      }
    });

    console.log(total);
  },
);

function isSafe(nums: number[]): boolean {
  let increasing = nums[0] < nums[1];

  for (let i = 0; i < nums.length - 1; i++) {
    const diff = nums[i + 1] - nums[i];

    if (
      (increasing && (diff <= 0 || diff > 3)) ||
      (!increasing && (diff >= 0 || diff < -3))
    ) {
      return false;
    }
  }

  return true;
}
