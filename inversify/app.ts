import "reflect-metadata";
import "./ioc/loader";

import { InversifyKoaServer } from "inversify-koa-utils";
import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

const container = new Container();
container.load(buildProviderModule());
const server = new InversifyKoaServer(container);

server
  .setErrorConfig((app) => {
    //错误处理中间件
  })
  .setConfig((app) => {
    //其他中间件
  });
const app = server.build();

app.listen(3001, () => {
  console.log("inversify server 启动成功");
});
