import fs from "fs";

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");

  let total = 0;
  lines.map((line) => {
    const [l, r] = line.split(": ");

    const res = Number(l);
    const arr = r.split(" ").map(Number);

    if (backtrack(res, arr)) {
      total += res;
    }
  });

  console.log(total);
});

function backtrack(num: number, arr: number[]): boolean {
  if (arr.length == 1) {
    if (arr[0] == num) {
      return true;
    } else {
      return false;
    }
  }

  if (arr[0] > num) {
    return false;
  }

  const sum = arr[0] + arr[1];
  const mul = arr[0] * arr[1];
  const join = Number(String(arr[0]) + String(arr[1]));

  return (
    backtrack(num, [mul, ...arr.slice(2)]) ||
    backtrack(num, [sum, ...arr.slice(2)]) ||
    backtrack(num, [join, ...arr.slice(2)])
  );
}
