class Singleton {
  private static instance: Singleton = null;

  constructor() {}

  private static getInstance(): Singleton {
    if (this.instance === null) {
      this.instance = new Singleton();
    }

    return this.instance;
  }
}
