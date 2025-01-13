var fs = require("fs");

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");

    let total = 0;

    for (let i = 0; i < lines.length; i++) {
      for (let j = 0; j < lines[0].length; j++) {
        try {
          if (lines[i][j] == "A") {
            if (
              (lines[i + 1][j + 1] == "M" &&
                lines[i - 1][j - 1] == "S" &&
                lines[i + 1][j - 1] == "M" &&
                lines[i - 1][j + 1] == "S") ||
              (lines[i + 1][j + 1] == "S" &&
                lines[i - 1][j - 1] == "M" &&
                lines[i + 1][j - 1] == "S" &&
                lines[i - 1][j + 1] == "M") ||
              (lines[i + 1][j + 1] == "M" &&
                lines[i - 1][j - 1] == "S" &&
                lines[i + 1][j - 1] == "S" &&
                lines[i - 1][j + 1] == "M") ||
              (lines[i + 1][j + 1] == "S" &&
                lines[i - 1][j - 1] == "M" &&
                lines[i + 1][j - 1] == "M" &&
                lines[i - 1][j + 1] == "S")
            ) {
              total += 1;
            }
          }
        } catch {
          continue;
        }
      }
    }

    console.log(total);
  },
);
