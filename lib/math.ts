function _gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

function _lcm(a: number, b: number): number {
  return Math.abs(a * b) / _gcd(a, b);
}

/**
 * Calculate the greatest common divisor of two or more numbers.
 * @param numbers The numbers to calculate the gcd.
 * @returns The greatest common divisor of the numbers.
 */
function gcd(...numbers: number[]): number {
  return numbers.reduce((acc, num) => _gcd(acc, num));
}

/**
 * Calculate the least common multiple of two or more numbers.
 * @param numbers The numbers to calculate the lcm.
 * @returns The least common multiple of the numbers.
 */
function lcm(...numbers: number[]): number {
  return numbers.reduce((acc, num) => _lcm(acc, num));
}

export { gcd, lcm };
