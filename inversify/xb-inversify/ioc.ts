export default class CreateIoc {
  public container: Map<Symbol, { callback: Function }>;
  constructor() {
    this.container = new Map();
  }

  bind(key: Symbol, callback: Function) {
    this.container.set(key, { callback });
  }

  get(namespace: Symbol) {
    let item = this.container.get(namespace);
    if (item) {
      return item.callback();
    } else {
      throw new Error(`${namespace}不存在`);
    }
  }
}
