import { Models } from "../models/User";

export interface IIndex {
  getUser(id:number): Models.User;
}
