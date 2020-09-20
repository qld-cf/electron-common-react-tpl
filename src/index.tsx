import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Entry from '@views/index';

console.log('process.env.REACT_APP_URL', process.env.REACT_APP_URL);
console.log('process.env', process.env);

ReactDOM.render(
  <HashRouter>
    <Entry />
  </HashRouter>,
  document.getElementById('root'));

// 模块热替换的 API
declare const module: any;
if (module.hot) {
  module.hot.accept();
}

serviceWorker.unregister();
