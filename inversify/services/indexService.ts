import { IIndex } from "../interface/IIndex";
import { Models } from "../models/User";
import { provide, buildProviderModule } from "inversify-binding-decorators";
import { TAGS } from "../constant/tags";

@provide(TAGS.IndexService)
export class IndexService implements IIndex {
  constructor() {}
  private userStorage: Models.User[] = [
    {
      email: "123123@qq.com",
      name: "小名",
    },
    {
      email: "12312312@qq.com",
      name: "小同",
    },
  ];
  getUser(id: number) {
    let result: Models.User;
    result = this.userStorage[id];
    return result;
  }
}
