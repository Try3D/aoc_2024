import * as lib from "../lib";

lib.io.readFile("input.txt").then((data) => {
  const matrix = new lib.matrix.StringMatrix(data);

  let part1 = 0;
  let part2 = 0;

  [...matrix].forEach((pos) => {
    if (matrix.getAt(pos) === "X") {
      for (const d of lib.matrix.ordinalDirections) {
        try {
          if (matrix.getAt(pos.add(d)) === "M" && matrix.getAt(pos.add(d.scale(2))) === "A" && matrix.getAt(pos.add(d.scale(3))) === "S") {
            part1++;
          }
        } catch {
          continue;
        }
      }
    }

    if (matrix.getAt(pos) === 'A') {
      try {
        const mainDiag = matrix.get(pos.x - 1, pos.y - 1) + 'A' + matrix.get(pos.x + 1, pos.y + 1);
        const offDiag = matrix.get(pos.x + 1, pos.y - 1) + 'A' + matrix.get(pos.x - 1, pos.y + 1);

        if ((mainDiag === "MAS" || mainDiag === "SAM") && (offDiag === "MAS" || offDiag === "SAM")) {
          part2++;
        }
      } catch {
        return;
      }
    }
  });

  console.log("Part1:", part1);
  console.log("Part2:", part2);
});
