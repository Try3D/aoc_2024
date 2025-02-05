import fs from "fs";

type OuType = {
  out: bigint | null;
  a: bigint;
  b: bigint;
  c: bigint;
  ip: number;
};

fs.readFile("input.txt", "utf8", function (err, data) {
  if (err) throw err;

  const lines = data.trim().split("\n");

  let A = Number(lines[0].replace("Register A: ", ""));
  let B = Number(lines[1].replace("Register B: ", ""));
  let C = Number(lines[2].replace("Register C: ", ""));

  let ptr = 0;

  const program = lines[4].replace("Program: ", "").split(",").map(Number);

  const res = [];
  while (ptr < program.length) {
    const opcode = program[ptr];
    const operand = program[ptr + 1];

    let comboValue;
    if (operand < 4) {
      comboValue = operand;
    } else if (operand === 4) {
      comboValue = A;
    } else if (operand === 5) {
      comboValue = B;
    } else {
      comboValue = C;
    }

    if (opcode === 0) {
      A = Math.floor(A / Math.pow(2, comboValue));
    } else if (opcode === 1) {
      B = B ^ operand;
    } else if (opcode === 2) {
      B = comboValue % 8;
    } else if (opcode === 3) {
      if (A !== 0) {
        ptr = operand - 2;
      }
    } else if (opcode === 4) {
      B = B ^ C;
    } else if (opcode === 5) {
      res.push(comboValue % 8);
    } else if (opcode === 6) {
      B = Math.floor(A / Math.pow(2, comboValue));
    } else {
      C = Math.floor(A / Math.pow(2, comboValue));
    }

    ptr += 2;
  }

  const result = getBestQuine(program, program.length - 1, 0n);
  console.log(Number(result));

  function comboOperand(a: bigint, b: bigint, c: bigint, value: bigint) {
    if (value < 4n) {
      return value;
    } else if (value === 4n) {
      return a;
    } else if (value === 5n) {
      return b;
    } else {
      return c;
    }
  }

  function evalInstrBig(
    a: bigint,
    b: bigint,
    c: bigint,
    ip: number,
    program: number[],
  ): OuType {
    const opcode = program[ip];
    const arg = BigInt(program[ip + 1]);
    const comb = comboOperand(a, b, c, arg);

    if (opcode === 0) {
      return {
        out: null,
        a: a / 2n ** comb,
        b: b,
        c: c,
        ip: ip + 2,
      };
    } else if (opcode === 1) {
      return {
        out: null,
        a: a,
        b: b ^ arg,
        c: c,
        ip: ip + 2,
      };
    } else if (opcode === 2) {
      return {
        out: null,
        a: a,
        b: comb % 8n,
        c: c,
        ip: ip + 2,
      };
    } else if (opcode === 3) {
      if (a === 0n) {
        return { out: null, a: a, b: b, c: c, ip: ip + 2 };
      } else {
        return { out: null, a: a, b: b, c: c, ip: Number(arg) };
      }
    } else if (opcode === 4) {
      return {
        out: null,
        a: a,
        b: b ^ c,
        c: c,
        ip: ip + 2,
      };
    } else if (opcode === 5) {
      return {
        out: comb % 8n,
        a: a,
        b: b,
        c: c,
        ip: ip + 2,
      };
    } else if (opcode === 6) {
      return {
        out: null,
        a: a,
        b: a / 2n ** comb,
        c: c,
        ip: ip + 2,
      };
    } else {
      return {
        out: null,
        a: a,
        b: b,
        c: a / 2n ** comb,
        ip: ip + 2,
      };
    }
  }

  function runProgramBig(a: bigint, b: bigint, c: bigint, program: number[]) {
    let ip = 0;
    const out = [];
    while (ip < program.length - 1) {
      const result = evalInstrBig(a, b, c, ip, program);
      a = result.a;
      b = result.b;
      c = result.c;
      ip = result.ip;
      if (result.out !== null) {
        out.push(result.out);
      }
    }
    return out;
  }

  function getBestQuine(
    program: number[],
    cursor: number,
    sofar: bigint,
  ): bigint | null {
    for (let candidate = 0n; candidate < 8n; candidate++) {
      const inputCandidate = sofar * 8n + candidate;
      const output = runProgramBig(inputCandidate, 0n, 0n, program);
      const expected = program.slice(cursor).map((n) => BigInt(n));

      if (arraysEqualBig(output, expected)) {
        if (cursor === 0) {
          return inputCandidate;
        }
        const ret = getBestQuine(program, cursor - 1, inputCandidate);
        if (ret !== null) {
          return ret;
        }
      }
    }
    return null;
  }
});

function arraysEqualBig<T>(arr1: T[], arr2: T[]) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}
