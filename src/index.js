// Dependancies
import React from 'react';
import { render } from 'react-dom';

// Import styles via Webpack
import './css/style.css';

// Components
import StorePicker from './components/StorePicker';

render(<StorePicker/>, document.querySelector('#main')); 