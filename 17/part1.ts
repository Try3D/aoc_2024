import fs from "fs";

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");

  let A = Number(lines[0].replace("Register A: ", ""));
  let B = Number(lines[1].replace("Register B: ", ""));
  let C = Number(lines[2].replace("Register C: ", ""));

  let ptr = 0;

  const prog = lines[4].replace("Program: ", "").split(",").map(Number);

  const res: number[] = [];
  while (ptr < prog.length) {
    const opcode = prog[ptr];
    const operand = prog[ptr + 1];

    if (opcode === 0) {
      A = Math.floor(A / Math.pow(2, comboOperand(operand)));
    } else if (opcode === 1) {
      B = B ^ operand;
    } else if (opcode === 2) {
      B = comboOperand(operand) % 8;
    } else if (opcode === 3) {
      if (A !== 0) {
        ptr = operand - 2;
      }
    } else if (opcode === 4) {
      B = B ^ C;
    } else if (opcode === 5) {
      res.push(comboOperand(operand) % 8);
    } else if (opcode === 6) {
      B = Math.floor(A / Math.pow(2, comboOperand(operand)));
    } else {
      C = Math.floor(A / Math.pow(2, comboOperand(operand)));
    }

    ptr += 2;
  }

  console.log(res.join(","));

  function comboOperand(x: number): number {
    if (x < 4) {
      return x;
    } else if (x === 4) {
      return A;
    } else if (x === 5) {
      return B;
    } else {
      return C;
    }
  }
});
