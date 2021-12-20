const Koa =require('koa') ;
const port = 3002;
const app = new Koa();
app.use((ctx, next) => {
    console.log('----------------')
    ctx.body = {
        data: 'hello 我是服务器返回的数据'
    }
})

app.listen(port, () => {
    console.log(`🏮${port}已经启动！`);
})