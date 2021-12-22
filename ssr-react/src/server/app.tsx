import Koa from "koa";
import Router, { IRouterContext } from "koa-router";
import fs from "fs";
import { resolve, join } from "path";
import path from "path/posix";
import serve from 'koa-static';
import { config } from "./config";
import { renderToString } from 'react-dom/server';
import React from 'react';
import App from '../shared/App'
import { StaticRouter } from "react-router-dom/server";
import { matchPath } from "react-router-dom";
import { createServerStore } from "../shared/store";
import { Provider } from "react-redux";
import routes from "../shared/Routes";
const { port } = config;
//执行的路径是命令执行时所在的目录
//__dirname目录是被执行的文件所在的当前目录
const fileResolve = (file) => path.join(__dirname, '../', file);
const template = fs.readFileSync(fileResolve("/assets/index.html"), "utf8");
const templating = (template) => {
  return (props) => {
    return template.replace(/<!--(\s*\S*\s*)-->/g, (_, key) => {
      return props[key.trim()];
    });
  }
};

const app = new Koa();

const router = new Router();



router.get(["/", "/about"], async (ctx: IRouterContext, next) => {
  const store = createServerStore()
  const promises: Promise<any>[] = [];
  routes.some(route => {
    const match = matchPath(ctx.request.path, route.path)
    const component = route.component;
    if (match && (route?.component as any).loadData) promises.push((component as any).loadData(store))
    return match;
  })
  await Promise.all(promises).then((data = []) => {
    const props = {
      html: renderToString(
        <Provider store={store}>
          <StaticRouter location={ctx.req.url}>
            <App />
          </StaticRouter>
        </Provider>
      ),
      store: `<script>var REDUX_STORE = ${JSON.stringify(store.getState())}; </script>`
    }
    ctx.body = templating(template)(props);
  })

});

router.get(["/dev-api/getData"], async (ctx, next) => {
  ctx.body = {
    code: "0",
    message: "succes",
    data: "服务器返回的数据success",
  };
});

app.use(router.routes()).use(router.allowedMethods());
app.use(serve(join(__dirname, '../', 'assets')));
app.listen(port, () => {
  console.log(`🏮${port}已经启动！`);
});
