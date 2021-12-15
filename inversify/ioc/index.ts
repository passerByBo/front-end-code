import { fluentProvide } from "inversify-binding-decorators"

//别名和名称
let provideThrowable = (identifier,name) => {
    return fluentProvide(identifier).whenTargetNamed(name).done();
}

export {
    provideThrowable
};