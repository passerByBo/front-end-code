import { IApi } from "@interfaces/IApi";
import { IData } from "@interfaces/IData";

export default class ApiService implements IApi {
  getInfo() {
    return new Promise<IData>((resolve, reject) => {
      resolve({
        item: "我是一些后台数据",
        result: ["结果1", 1, "结果2", 2],
      });
    });
  }
}
