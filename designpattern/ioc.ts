interface NewAble<T> {
    new (...args: any[]): T;
  }
  interface Icontainer {
    callback: () => {};
    singleton: boolean;
    instance?: {};
  }
  class CreateIoc {
    private container: Map<PropertyKey, Icontainer>;
    constructor() {
      this.container = new Map<string, Icontainer>();
    }
    bind<T>(key: string, Fn: NewAble<T>) {
      const callback = () => new Fn();
      this.container.set(key, { callback, singleton: false });
    }
    fake() {}
    use<T>(namespace: string) {
      let item = this.container.get(namespace);
      if (item !== undefined) {
        //看一下目标的对象上是否有singleton指定是个单列
        //还得看一下 instance是否被赋值 不能再二次赋值
        if (item.singleton && !item.instance) {
          item.instance = item.callback();
        }
      } else {
        throw new Error('该容器内并未找到实例');
      }
      return item.singleton ? (item.instance as T) : (item?.callback() as T);
    }
    restore(key: string) {
      this.container.delete(key);
    }
  }
  
  const ioc = new CreateIoc();
  
  interface IUserService {
    test(str: string): void;
  }
  class UserService implements IUserService {
    constructor() {}
    public test(str: string) {
      console.log(str);
    }
  }
  ioc.bind<IUserService>('userService', UserService);
  const user = ioc.use<IUserService>('userService');
  user.test('京程一灯');
  