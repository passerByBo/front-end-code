//本体不方便对外 代理对象能力不能超过本地

interface IUserDao {
  save(): void;
}

class UserDao implements IUserDao {
  public save(): void {
    console.log("---数据已保存---");
  }
}
class UserDaoProxy implements IUserDao {
  private target: IUserDao;
  constructor(target: IUserDao) {
    this.target = target;
  }
  save(): void {
    console.log("---开始事务---");
    this.target.save();
    console.log("---提交事务---");
  }
}

const target = new UserDao();
const proxy = new UserDaoProxy(target);

proxy.save();

//导出proxy 外部无感内部的UserDao
