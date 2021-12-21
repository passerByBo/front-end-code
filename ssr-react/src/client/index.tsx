import React from "react";
import ReactDOM from 'react-dom';
import App from '../shared/app';

//异步加载lodash
import ('lodash').then((_) => {
    console.log(_)
})

ReactDOM.render(<App/>, document.querySelector('#app'))