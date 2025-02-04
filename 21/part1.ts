import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    let nums = data.trim().split("\n").map(BigInt);

    for (let i = 0; i < 2000; i++) {
      nums = nums.map(mod);
    }

    let total = nums.reduce((acc, num) => acc + Number(num), 0);
    console.log(total);
  },
);

function mod(secret: bigint) {
  secret = (secret ^ (secret * BigInt(64))) % BigInt(16777216);
  secret = (secret ^ (secret / BigInt(32))) % BigInt(16777216);
  secret = (secret ^ (secret * BigInt(2048))) % BigInt(16777216);
  return secret;
}
