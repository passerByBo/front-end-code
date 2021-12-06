const Koa = require('koa');
var Router = require('@koa/router');
const fs  = require('fs');
const {resolve} = require('path');
const app = new Koa();
const router = new Router();
const task1 = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(`<script> addHtml("part1", "第一次传输的内容")</script>`)
        }, 2000)
    })
}

const task2 = () => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            resolve(`<script> addHtml("part2", "第二次传输的内容")</script>`)
        }, 2000)
    })
}

router.get('/', async (ctx,next) => {
    // const file = fs.readFileSync("index.html", "utf-8");
    
    // ctx.res.write(file);

    const filename = resolve(__dirname, 'index.html');
    const stream = fs.createReadStream(filename);
    ctx.status =200;
    ctx.type="html";
    stream.on('data',(chunk)=>{
        ctx.res.write(chunk);
    })
    const part1 = await task1();
    ctx.res.write(part1)
    const part2 = await task2();
    ctx.res.write(part2)
    ctx.res.end();
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(8085,() => {
    console.log("服务已经启动！")
})