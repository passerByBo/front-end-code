const Styletron =  require('styletron');
const {injectStyle} = require('styletron-utils');
const styletron = new Styletron();

const parsedCss = require('./main.css');
//循环parsedCss依次执行injectStyle

const redButton = injectStyle(styletron, {
    color:'red',
    fontSize: '14px'
})

const blueButton = injectStyle(styletron, {
    color:'blue',
    fontSize: '14px'
})

console.log(redButton,blueButton)
console.log(styletron)