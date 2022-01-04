//观察者
interface Observer {
    update(version: number): void;
  }
  
  //小哥的公众号
  interface Subject {
    addObserver(key: string, obj: Observer): void;
    deleteObserver(key: string): void;
    notifyObserver(): void;
  }
  
  class MagazineSubject implements Subject {
    public() {
      throw new Error('Method not implemented.');
    }
    //存放订阅者
    private observers: Map<string, Observer> = new Map<string, Observer>();
    private version: number = 0;
    public addObserver(key: string, obj: Observer): void {
      this.observers.set(key, obj);
    }
    public deleteObserver(key: string): void {
      if (this.observers.has(key)) {
        this.observers.delete(key);
      } else {
        throw new Error('Observer对象上不存在这个key');
      }
    }
    public notifyObserver(): void {
      for (const item of this.observers) {
        const o: Observer = item[1];
        o.update(this.version);
      }
    }
    public publish() {
      this.version++;
      this.notifyObserver();
    }
  }
  
  class CustomObserver implements Observer {
    private name: string;
    private version: number;
    constructor(name) {
      this.name = name;
    }
    public update(version: number): void {
      this.version = version;
      console.log('该杂志出现版本了');
      this.buy();
    }
    public buy(): void {
      console.log(`${this.name} 购买了 ${this.version} 期的杂志`);
    }
  }
  
  const magazine = new MagazineSubject();
  
  const a = new CustomObserver('travis');
  const b = new CustomObserver('小白');
  const c = new CustomObserver('啊啊啊啊');
  
  magazine.addObserver('a', a);
  magazine.addObserver('b', b);
  magazine.addObserver('c', b);
  
  magazine.publish();
  