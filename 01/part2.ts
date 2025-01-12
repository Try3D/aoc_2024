var fs = require("fs");

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");

  const counter = new Map();

  lines.map((line) => {
    const num = parseInt(line.split("   ")[1]);
    counter.get(num)
      ? counter.set(num, counter.get(num) + 1)
      : counter.set(num, 1);
  });

  let total = 0;
  lines.map((line) => {
    const num = parseInt(line.split("   ")[0]);

    total += num * (counter.get(num) || 0);
  });

  console.log(total);
});
