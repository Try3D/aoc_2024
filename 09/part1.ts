import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const line = data.trim();

    let s: string[] = [];
    let idx = 0;

    for (let i = 0; i < line.length; i += 2) {
      for (let j = 0; j < Number(line[i]); j++) {
        s.push(String(idx));
      }

      if (i + 1 < line.length) {
        for (let j = 0; j < Number(line[i + 1]); j++) {
          s.push("*");
        }
      }

      idx += 1;
    }

    let l = 0;
    let r = s.length - 1;

    while (l < r) {
      while (s[l] !== "*" && l < r) {
        l += 1;
      }

      while (s[r] == "*" && l < r) {
        r -= 1;
      }

      const tmp = s[r];
      s[r] = s[l];
      s[l] = tmp;

      l += 1;
      r -= 1;
    }

    let total = 0;
    for (let i = 1; i < s.length; i++) {
      if (s[i] !== "*") {
        total += Number(s[i]) * i;
      }
    }

    console.log(total);
  },
);
