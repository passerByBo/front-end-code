const HtmlWebpackPlugin = require('html-webpack-plugin');
const pluginName = 'HtmlAfterPlugin';

const assetsHelp = (data) => {
  let js = [];
  let css = [];
  const getAssetsName = {
    js: (item) => `<script class="lazyload-js" src="${item}"></script>`,
    css:(item) => `<link href="${item}" type="stylesheet"/>`
  };
  for (let jsitem of data.js) {
    js.push(getAssetsName.js(jsitem));
  }

  for (let cssitem of data.css) {
    css.push(getAssetsName.js(cssitem));
  }
  return {
    js,
    css,
  };
};

class HtmlAfterPlugin {
  constructor() {
    this.jsarr = [];
    this.cssarr = []
  }
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        pluginName,
        (htmlPligunData, cb) => {
          const { js,css } = assetsHelp(htmlPligunData.assets);
          this.jsarr = js;
          this.cssarr = css;
          cb(null, htmlPligunData);
        }
      );
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        pluginName,
        (data, cb) => {
          let _html = data.html;
          console.log('----------', this.cssarr)
          _html = _html.replace('<!--injectjs-->', this.jsarr.join(''));
          _html = _html.replace('<!--injectcss-->', this.jsarr.join(''));
          _html = _html.replace(/@components/g, '../../../components');
          _html = _html.replace(/@layouts/g, '../../layouts');
          data.html = _html;
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlAfterPlugin;
