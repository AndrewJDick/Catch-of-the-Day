// Dependancies
import React from 'react';
import { render } from 'react-dom';

// Import styles via Webpack
import './css/style.css';

// Components
import App from './components/App';
import StorePicker from './components/StorePicker';

render(<App/>, document.querySelector('#main')); 