const { SyncHook } = require('tapable');
const { join } = require('path');
const Parser = require('./Parser');
const { writeFileSync } = require('fs');

class Compilation {
    constructor(compiler) {
        const { options, modules } = compiler;
        this.options = options || {};
        this.modules = modules || [];
    }
    seal() {
        this.buildModule();
    }

    buildModule(fileName, isEntry) {
        let ast = '';
        let absolutePath = '';
        if (!isEntry) {
            absolutePath = join(process.cwd(), './src/', fileName);
            ast = Parser.ast(absolutePath);
        } else {
            ast = Parser.ast(fileName);
        }

        const dependencies = Parser.getDependency(ast);
        const transformCode = Parser.transform(ast);

        return {
            fileName,
            dependencies,
            transformCode
        }
    }

    emitFiles() {
        let modules = '';
        const outputPath = join(
            this.options.output.path,
            this.options.output.filename
        );
        this.modules.map((_module) => {
            _modules += ` '${_module.fileName}': function (module, exports, require) {
                ${_module.transformCode}
              },`;
        })
        const template = `(function (modules) {
            var installedModules = {};
            function __webpack_require__(moduleId) {
              // Check if module is in cache
              if (installedModules[moduleId]) {
                return installedModules[moduleId].exports;
              }
              // module.exports = {};
              //构建一个新的模块化规范 并 将moduleId放入缓存
              var module = (installedModules[moduleId] = {
                exports: {},
              });
              modules[moduleId].call(
                module.exports,
                module,
                module.exports,
                __webpack_require__
              );
              //小心机
              return module.exports;
            }
            return __webpack_require__('${this.options.entry}');
          })({
           ${_modules}
          });
          `;

        console.log('🐻', outputPath);
        writeFileSync(outputPath, template, 'utf-8');
    }
}

module.exports = Compilation;