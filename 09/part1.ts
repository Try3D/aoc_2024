import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const line = data.trim();

    let s = "";
    let idx = 0;

    for (let i = 0; i < line.length; i += 2) {
      if (i + 1 >= line.length) {
        s += strMul(String(idx), Number(line[i]));
      } else {
        s += strMul(String(idx), Number(line[i]));
        s += strMul("*", Number(line[i + 1]));
      }

      idx += 1;
    }

    let l = 0;
    let r = s.length - 1;

    let sArr = s.split("");

    while (l < r) {
      while (sArr[l] !== "*" && l < r) {
        l += 1;
      }

      while (sArr[r] == "*" && l < r) {
        r -= 1;
      }

      const tmp = sArr[r];
      sArr[r] = sArr[l];
      sArr[l] = tmp;

      l += 1;
      r -= 1;
    }

    let total = 0;
    for (let i = 1; i < sArr.length; i++) {
      if (sArr[i] !== "*") {
        total += Number(sArr[i]) * i;
      }
    }

    console.log(total);
  },
);

function strMul(x: string, n: number) {
  return new Array(n).fill(x).join("");
}
