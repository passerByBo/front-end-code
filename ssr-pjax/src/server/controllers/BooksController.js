import Controller from './Controller';
import cheerio from 'cheerio';
import { Readable } from 'stream';
import { createGzip } from 'zlib';
class ApiController extends Controller {
  constructor() {
    super();
  }
  async actionIndex(ctx, next) {
    // const book = new Book();
    // const { data } = await book.getData();
    const data = '123';
    // console.log('🐻', data);
    // ctx.body = {
    //   data,
    // };
    const html = await ctx.render('books/pages/list', {
      data,
    });
    if (ctx.request.header['x-pjax']) {
      console.log('站内切');
      const $ = cheerio.load(html);
      ctx.status = 200;
      ctx.type = 'html';
      //每个组件都需要加 否则切页动态替换的时候不能加载所有的组件
      $('.pjaxcontent').each(function () {
        ctx.res.write($(this).html());
      });
      //因为有缓存的原因原地切虽然没有重新加载js但是已经在栈中，当两个页面来回切就会发现js没有运行所以要加如下代码
      $('.lazyload-js').each(function () {
        ctx.res.write(
          `<script class="lazyload-js" src="${$(this).attr('src')}"></script>`
        );
      });
      ctx.res.end();
    } else {
      function createSSRStreamPromise() {
        console.log('落地页');
        return new Promise((resolve, reject) => {
          const htmlStream = new Readable()
          htmlStream.push(html);
          htmlStream.push(null);
          ctx.type = 'html';
          ctx.status = 200;
          ctx.res.setHeader('content-encoding', 'gzip')
          const gz = createGzip();
          htmlStream.on('error', (err) => {
            reject(err)
          })
            .pipe(gz)
            .pipe(ctx.res)
        })
      }

      await createSSRStreamPromise();
    }
    ctx.body = await ctx.render('books/pages/list');
  }
  async actionCreate(ctx) {
    ctx.body = await ctx.render('books/pages/create');
  }
}
export default ApiController;
