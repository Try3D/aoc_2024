import fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) throw err;

  const lines = data.trim().split("\n");

  const graph = new Map<string, Set<string>>();

  lines.forEach((line) => {
    const [a, b] = line.split("-");

    if (!graph.has(a)) {
      graph.set(a, new Set());
    }
    if (!graph.has(b)) {
      graph.set(b, new Set());
    }
    graph.get(a)!.add(b);
    graph.get(b)!.add(a);
  });

  const maximalCliques: Set<string>[] = [];

  function bronKerbosch(R: Set<string>, P: Set<string>, X: Set<string>) {
    if (P.size === 0 && X.size === 0) {
      maximalCliques.push(new Set(R));
      return;
    }

    for (const v of Array.from(P)) {
      const neighbors = graph.get(v) || new Set<string>();

      const newR = new Set(R);
      newR.add(v);

      const newP = new Set<string>();
      for (const u of P) {
        if (neighbors.has(u)) {
          newP.add(u);
        }
      }

      const newX = new Set<string>();
      for (const u of X) {
        if (neighbors.has(u)) {
          newX.add(u);
        }
      }

      bronKerbosch(newR, newP, newX);

      P.delete(v);
      X.add(v);
    }
  }

  const allVertices = new Set(graph.keys());
  bronKerbosch(new Set(), allVertices, new Set());

  let maxClique: Set<string> = new Set();
  for (const clique of maximalCliques) {
    if (clique.size > maxClique.size) {
      maxClique = clique;
    }
  }

  const sortedClique = Array.from(maxClique).sort();
  const password = sortedClique.join(",");

  console.log(password);
});
