const Compiler = require('./Compiler');
const options = require('../xbpack.config');

const compiler = new Compiler(options);
const plugins = options.plugins;

//启用plugin的监听器
for(let plugin of plugins){
    plugin.apply(compiler)
}

compiler.run();




