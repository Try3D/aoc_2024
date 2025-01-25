import fs from "fs";

function* generatePossibleA(program) {
  const outIndices = [];
  for (let i = 0; i < program.length; i += 2) {
    if (program[i] === 5) {
      // opcode 5 is out
      outIndices.push(i);
    }
  }
  if (outIndices.length === 0) return;

  let base = 1;
  let A = 0;
  for (let idx of outIndices) {
    const operand = program[idx + 1];
    let value;
    if (operand === 4) {
      // Combo operand A
      value = program[idx / 2];
    } else {
      // For simplicity, assume other combo operands might not depend on A in a predictable way
      // This is a simplification and may not work for all cases
      value = program[idx / 2];
    }
    A += value * base;
    base *= 8;
  }
  yield A;
}

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");
  const A_initial = Number(lines[0].replace("Register A: ", ""));
  const B_initial = Number(lines[1].replace("Register B: ", ""));
  const C_initial = Number(lines[2].replace("Register C: ", ""));
  const prog = lines[4].replace("Program: ", "").split(",").map(Number);

  const expectedOutput = prog.join(",");

  for (const candidateA of generatePossibleA(prog)) {
    let A = candidateA;
    let B = B_initial;
    let C = C_initial;
    let output = [];
    let outPtr = 0;
    let counter = 0;

    while (counter < prog.length) {
      const opcode = prog[counter];
      const operand = prog[counter + 1];
      if (opcode === 0) {
        // adv
        const shift = comboOperand(operand);
        A = Math.floor(A / Math.pow(2, shift));
        counter += 2;
      } else if (opcode === 1) {
        // bxl
        B = B ^ operand;
        counter += 2;
      } else if (opcode === 2) {
        // bst
        const val = comboOperand(operand) % 8;
        B = val;
        counter += 2;
      } else if (opcode === 3) {
        // jnz
        if (A !== 0) {
          counter = operand;
        } else {
          counter += 2;
        }
      } else if (opcode === 4) {
        // bxc
        B = B ^ C;
        counter += 2;
      } else if (opcode === 5) {
        // out
        const val = comboOperand(operand) % 8;
        output.push(val);
        if (val !== prog[outPtr]) {
          break;
        }
        outPtr++;
        counter += 2;
      } else if (opcode === 6) {
        // bdv
        const shift = comboOperand(operand);
        B = Math.floor(A / Math.pow(2, shift));
        counter += 2;
      } else if (opcode === 7) {
        // cdv
        const shift = comboOperand(operand);
        C = Math.floor(A / Math.pow(2, shift));
        counter += 2;
      } else {
        counter += 2;
      }

      if (output.length > prog.length) break;
    }

    if (output.join(",") === expectedOutput) {
      console.log(candidateA);
      return;
    }
  }

  function comboOperand(x) {
    if (x < 4) return x;
    else if (x === 4) return A;
    else if (x === 5) return B;
    else if (x === 6) return C;
    else throw new Error("Invalid combo operand");
  }
});
