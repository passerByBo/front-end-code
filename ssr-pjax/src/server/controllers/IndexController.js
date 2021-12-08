import Controller from './Controller';
class IndexController extends Controller {
  constructor() {
    super();
  }
  async actionIndex(ctx, next) {
    ctx.body = '我是首页🏮';
    // ctx.body = await ctx.render('index', {
    //   data: '我是首页',
    // });
  }
}
export default IndexController;
