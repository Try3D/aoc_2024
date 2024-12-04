class Coordinate {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(other: Coordinate): Coordinate {
    return new Coordinate(this.x + other.x, this.y + other.y);
  }

  scale(factor: number): Coordinate {
    return new Coordinate(this.x * factor, this.y * factor);
  }

  manhattanDistance(other: Coordinate): number {
    return Math.abs(this.x - other.x) + Math.abs(this.y - other.y);
  }
}

class StringMatrix {
  public M: string[];
  public HEIGHT: number;
  public WIDTH: number;


  public constructor(data: string[]) {
    this.M = data;
    this.HEIGHT = data.length;
    this.WIDTH = data[0].length;
  }

  public get(x: number, y: number): string {
    if (y < 0 || y > this.M.length - 1 || x < 0 || x > this.M[y].length - 1) {
      throw new Error("Out of bounds");
    }
    return this.M[y][x];
  }

  public getAt(coord: Coordinate): string {
    if (coord.y < 0 || coord.y > this.M.length - 1 || coord.x < 0 || coord.x > this.M[coord.y].length - 1) {
      throw new Error("Out of bounds");
    }
    return this.M[coord.y][coord.x];
  }

  public *[Symbol.iterator]() {
    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        yield new Coordinate(x, y);
      }
    }
  }

}

const cardinalDirections: Coordinate[] = [
  new Coordinate(0, -1),
  new Coordinate(0, 1),
  new Coordinate(-1, 0),
  new Coordinate(1, 0),
];

const ordinalDirections: Coordinate[] = [
  ...cardinalDirections,
  new Coordinate(-1, -1),
  new Coordinate(-1, 1),
  new Coordinate(1, -1),
  new Coordinate(1, 1),
];

export { StringMatrix, cardinalDirections, ordinalDirections };
