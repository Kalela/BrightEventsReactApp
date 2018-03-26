import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, browserHistory } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import routes from './routes'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
    <Router>
    { routes }
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
