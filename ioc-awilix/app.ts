import { addAliases } from "module-alias";
//要想别名生效还需要在tsConfig中配置basePath和path
addAliases({
  //@types/node 不然会报错
  "@root": __dirname,
  "@interfaces": `${__dirname}/interface`,
});

import Koa from "koa";
import { createContainer, Lifetime } from "awilix";
import {scopePerRequest,loadControllers} from 'awilix-koa';
import render from 'koa-swig';
import co from 'co';
import path from "path/posix";


const app = new Koa();

app.context.render = co.wrap(render({
    root:path.join(__dirname,'views'),
    autoScope:true,
    cache:'memory',
    ext:'html',
    writeBody:false,
}))

//创建 一个基础的容器 负责装载服务
const container = createContainer();
//将所有的服务注入到容器中
container.loadModules([`${__dirname}/services/*.ts`], {
  //自动转换为驼峰命名
  formatName: "camelCase",
  //
  resolverOptions: {
    //service是每次创建还是单例
    // 每次创建新的实例
    lifetime: Lifetime.SCOPED,
  },
});

//把container注入到koa的运行流程
app.use(scopePerRequest(container))

app.use(loadControllers(`${__dirname}/routers/*.ts`))

app.listen("8081", () => {
  console.log("第一个 IOS Node应用",`端口${8081}`);
});
