import { Container } from "inversify";
import { JiaoShi, LaoShi, XiaoMing } from "./entites";
import { Classrome, Student, Teacher } from "./interface";
import { TYPES } from "./types";

const container = new Container();

container.bind<Student>(TYPES.Student).to(XiaoMing)
container.bind<Teacher>(TYPES.Teacher).to(LaoShi)
container.bind<Classrome>(TYPES.Classrome).to(JiaoShi)

export default container;