import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import routes from './Components/routes'

ReactDOM.render(
    <Router>
    { routes }
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
