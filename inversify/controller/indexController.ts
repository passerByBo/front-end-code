import { inject, injectable } from "inversify";
import { interfaces, controller, httpGet,TYPE} from "inversify-koa-utils";
import { TAGS } from "../constant/tags";
import { IIndex } from "../interface/IIndex";
import {IRouterContext} from 'koa-router';
import { provideThrowable } from "../ioc";
// import {BaseContext} from 'koa';
//service一次性加载到容器中，controller需要在遇到这个路由的时候才会加载对应的controller 流式的provider
@provideThrowable(TYPE.Controller,'IndexController')
@controller('/')
export default class IndexController implements interfaces.Controller {
  private indexService: IIndex;
  constructor(@inject(TAGS.IndexService) indexService) {
    this.indexService = indexService;
  }

  @httpGet('/')
  private async indexAction(ctx:IRouterContext, next:Promise<unknown>):Promise<any> {
      const data = this.indexService.getUser(1);
       ctx.body = {
           data,
       }
  }
}
