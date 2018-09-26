import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import {default as App} from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './global-ctx/StoreCreator';

ReactDOM.render(
    <Provider store={store}> 
        <App /> 
    </Provider>, document.getElementById('root'));
registerServiceWorker();
