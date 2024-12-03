class Counter<T> {
  counter = new Map<T, number>();

  public constructor(args: T[] = []) {
    args.forEach((arg) => {
      this.counter.set(arg, (this.counter.get(arg) || 0) + 1);
    });
  }

  public get(key: T): number {
    return this.counter.get(key) || 0;
  }

  public update(args: T[]): void {
    args.forEach((arg) => {
      this.counter.set(arg, (this.counter.get(arg) || 0) + 1);
    });
  }

  public items(): [T, number][] {
    return Array.from(this.counter.entries());
  }
}

export { Counter };
