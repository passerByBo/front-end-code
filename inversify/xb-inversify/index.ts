import "reflect-metadata";
import { parseScript } from "esprima";
import { Pattern } from "estree";
import CreateIoc from "./ioc";

const container = new CreateIoc();

interface IIndexService {
  log(str: string): void;
}

interface ITypes {
  [key: string]: Symbol;
}

const TYPES: ITypes = {
  indexService: Symbol.for("indexService"),
};

class IndexService implements IIndexService {
  log(str: string): void {
    console.log(str);
  }
}

container.bind(TYPES.indexService, () => new IndexService());

//获取传入的函数的参数
function getParams(fn: Function) {
  let ast = parseScript(fn.toString());
  let node = ast.body[0];
  let fnParams: Pattern[] = [];
  if (node.type === "FunctionDeclaration") {
    fnParams = node.params;
  }
  let validParams: string[] = [];
  fnParams.forEach((obj) => {
    if (obj.type === "Identifier") {
      validParams.push(obj.name);
    }
  });

  return validParams;
}

function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key);
}

function inject(serviceIdentifier: Symbol): Function {
  //目标函数、关键字(别名)controller没有别名、参数索引位置
  return (target: Function, targetKey: string, index: number) => {
    //使用元编程的方式将service注入到controller
    if (!targetKey) {
      Reflect.defineMetadata(
        serviceIdentifier,
        container.get(serviceIdentifier),
        target
      );
    }
  };
}


//确认传入类为可new的
function controller<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class Controller extends constructor {
    constructor(...args: any[]) {
      super(args);
      const _params = getParams(constructor);
      let identity: string;
      for (identity of _params) {
        if (hasKey(this, identity)) {
          //   this[identity] = container.get(TYPES[identity]);
          this[identity] = Reflect.getMetadata(TYPES[identity], constructor);
        }
      }
    }
  };
}

@controller
class IndexController {
  private indexService: IIndexService;
  constructor(@inject(TYPES.indexService) indexService?: IIndexService) {
    //骗typescript
    this.indexService = indexService!;
  }

  info() {
    this.indexService.log("石晓波-ioc");
  }
}

let indexController = new IndexController();

indexController.info();
