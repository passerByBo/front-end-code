import { inject, injectable } from "inversify";
import { Student, Teacher, Classrome } from "./interface";
import { TYPES } from "./types";

@injectable()
export class XiaoMing implements Student {
  public learn(): string {
    return "努力学习知识点";
  }
}

@injectable()
export class LaoShi implements Teacher {
  public teaching(): string {
    return "教学中";
  }
}

@injectable()
export class JiaoShi implements Classrome {
  private _xiaoming: Student;
  private _laoshi: Teacher;
  constructor(
    @inject(TYPES.Student) xiaoming: Student,
    @inject(TYPES.Teacher) laoshi: Teacher
  ) {
    this._laoshi = laoshi;
    this._xiaoming = xiaoming;
  }
  public study(): string {
    return this._laoshi.teaching() + this._xiaoming.learn();
  }
}
