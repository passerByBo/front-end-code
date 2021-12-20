import Koa from "koa";
import Router from "koa-router";
const port = 3002;
const app = new Koa();
const router = new Router();

router.get(["/", "about"], async (ctx, next) => {
    ctx.body = `<h1>服务器数据</h1>`
});

router.get(["dev-api/getData"], async (ctx, next) => {
  ctx.body = {
      code: '0',
      message: 'succes',
      data: '服务器返回的数据'
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`🏮${port}已经启动！`);
});
