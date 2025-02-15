import fs from "fs";

fs.readFile(
  "input.txt",
  "utf8",
  function (err: NodeJS.ErrnoException | null, data: string) {
    if (err) throw err;

    const lines = data.trim().split("\n");
    const mapping = new Map<string, string[]>();

    lines.forEach((line) => {
      const [l, r] = line.split("-");

      mapping.set(l, [...(mapping.get(l) || []), r]);
      mapping.set(r, [...(mapping.get(r) || []), l]);
    });

    const vertices = Array.from(mapping.keys()).sort();

    const triangles: string[][] = [];

    for (let i = 0; i < vertices.length; i++) {
      for (let j = i + 1; j < vertices.length; j++) {
        for (let k = j + 1; k < vertices.length; k++) {
          const a = vertices[i],
            b = vertices[j],
            c = vertices[k];

          if (
            mapping.get(a)?.includes(b) &&
            mapping.get(a)?.includes(c) &&
            mapping.get(b)?.includes(c)
          ) {
            triangles.push([a, b, c]);
          }
        }
      }
    }

    const trianglesWithT = triangles.filter((triangle) =>
      triangle.some((name) => name.startsWith("t")),
    );

    console.log(trianglesWithT.length);
  },
);
