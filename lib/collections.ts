type ItemType<T> = {
  key: T;
  value: number;
};

/**
 * Counter class to count the number of occurrences of elements in an iterable
 * @class Counter
 */
class Counter<T> {
  counter = new Map<T, number>();

  /**
   * Create a new Counter object
   * @param args The iterable to count the number of occurrences of elements
   * @returns A new Counter object
   */
  public constructor(args: Iterable<T> = []) {
    for (const arg of args) {
      this.counter.set(arg, (this.counter.get(arg) || 0) + 1);
    }
  }

  /**
   * Get the number of occurrences of an element
   * @param key The element to get the number of occurrences
   * @returns The number of occurrences of the element
   */
  public get(key: T): number {
    return this.counter.get(key) || 0;
  }

  /**
   * Updates the counter with elements from an iterable.
   * @param args - An iterable collection of elements to update the counter with.
   */
  public update(args: T[]): void {
    args.forEach((arg) => {
      this.counter.set(arg, (this.counter.get(arg) || 0) + 1);
    });
  }

  /**
   * Returns all items in the counter as an array of objects with schema {key: <>, value: <>}.
   * @returns An array of objects representing the elements and their counts.
   */
  public items(): ItemType<T>[] {
    return Array.from(this.counter.entries()).map(([key, value]) => ({
      key: key,
      value: value,
    }));
  }
}

export { Counter };
