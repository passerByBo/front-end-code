import { IApi } from "@interfaces/IApi";
import { GET, route } from "awilix-koa";
import ApiService from "services/ApiService";
import Router from "koa-router";

@route("/api")
class ApiController {
  private apiService: IApi;
  constructor({ apiService }: { apiService: IApi }) {
    this.apiService = apiService;
    console.log('new le ')
  }

  @route("/list")
  @GET()
  async actionList(ctx: Router.IRouterContext, next: () => Promise<unknown>) {
      ctx.body = await this.apiService.getInfo()
  }
}

export default ApiController;
