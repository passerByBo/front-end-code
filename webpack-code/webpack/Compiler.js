const { SyncHook } = require('tapable');
const Compilation = require('./Compilation')
class Compiler {
    constructor(options) {
        this.hooks = {
            run: new SyncHook(['compilation'])
        }
        this.modules = [];
        this.options = options;
    }
    run() {
        const onCompiled = (err, compilation) => {

        }

        this.compile(onCompiled);
    }

    compile(callback) {
        const compilation = this.newCompilation();
        this.hooks.run.call(compilation);

        const entryModule = compilation.buildModule(this.options.entry, true)
        // this.modules.push(entryModule);
        // this.modules.map((_module) => {
        //     _module.dependencies.map((dependency) => {
        //         // console.log('✨', _module);
        //         this.modules.push(compilation.buildModule(dependency, false));
        //     })
        // })
        // compilation.emitFiles();
    }

    createCompilation() {
        return new Compilation(this);
    }

    newCompilation() {
        const compilation = this.createCompilation();
        return compilation;
    }

}

module.exports = Compiler;