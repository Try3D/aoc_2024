import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    let n = 0;

    const lToR = new Map<number, Set<number>>();
    const rToL = new Map<number, Set<number>>();

    for (const line of lines) {
      if (!line) {
        break;
      }

      const [l, r] = line.split("|").map(Number);

      lToR.set(l, (lToR.get(l) || new Set()).add(r));
      rToL.set(r, (rToL.get(r) || new Set()).add(l));
      n += 1;
    }

    const listOfNums = lines
      .slice(n + 1)
      .map((line) => line.split(",").map(Number));

    let total = 0;
    for (const nums of listOfNums) {
      if (!valid(nums, rToL)) {
        total += topoSort(nums, lToR)[Math.floor(nums.length / 2)];
      }
    }

    console.log(total);
  },
);

function valid(nums: number[], rToL: Map<number, Set<number>>): boolean {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (rToL.get(nums[i])?.has(nums[j])) {
        return false;
      }
    }
  }

  return true;
}

function topoSort(nums: number[], lToR: Map<number, Set<number>>): number[] {
  const inDegree = new Map<number, number>();
  const adj = new Map<number, Set<number>>();

  for (const num of nums) {
    inDegree.set(num, 0);
    adj.set(num, new Set<number>());
  }

  for (const num of nums) {
    const dependencies = lToR.get(num);
    if (dependencies) {
      for (const dep of dependencies) {
        if (nums.includes(dep)) {
          adj.get(num)!.add(dep);
          inDegree.set(dep, inDegree.get(dep)! + 1);
        }
      }
    }
  }

  const queue: number[] = [];
  let queueStart = 0;

  for (const num of nums) {
    if (inDegree.get(num) === 0) {
      queue.push(num);
    }
  }

  const result: number[] = [];

  while (queueStart < queue.length) {
    const current = queue[queueStart++];
    result.push(current);

    for (const neighbor of adj.get(current)!) {
      inDegree.set(neighbor, inDegree.get(neighbor)! - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}
