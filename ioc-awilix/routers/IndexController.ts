import { GET, route } from "awilix-router-core";
import { Context } from "@interfaces/IKoa";
import ApiService from "services/ApiService";

@route("/")
class IndexController {
    private apiService:ApiService;
  constructor({apiService}:{apiService:ApiService}) {
     this.apiService = apiService;
  }

  @route("")
  @GET()
  async actionList(ctx: Context, next: () => Promise<unknown>):Promise<any> {
      let data = await this.apiService.getInfo();
    ctx.body = await ctx.render<string>("index");
  }
}

export default IndexController;
