//命令栈
//接受者角色类
class Receiver {
    public action(): void {
      console.log('执行操作');
    }
  }
  //抽象命令角色类
  interface Command {
    exec(): void;
  }
  //具体命令角色类
  class ConcrateCommand implements Command {
    private receiver: Receiver = null!;
    constructor(receiver) {
      this.receiver = receiver;
    }
    public exec(): void {
      this.receiver.action();
    }
  }
  
  //角色类
  class Invoker {
    private command: Command;
    constructor(command: Command) {
      this.command = command;
    }
    public action(): void {
      this.command.exec();
    }
  }
  
  const receiver: Receiver = new Receiver();
  const command: Command = new ConcrateCommand(receiver);
  
  const invoker: Invoker = new Invoker(command);
  invoker.action();
  














