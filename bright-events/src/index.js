import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './static/css/index.css';
import App from './static/js/App';
import registerServiceWorker from './registerServiceWorker';
import routes from './static/js/routes'

ReactDOM.render(
    <Router>
    { routes }
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
