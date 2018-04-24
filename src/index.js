import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import routes from './routes'

ReactDOM.render(
    <Router current_user={"Admin"}>
    { routes }
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
