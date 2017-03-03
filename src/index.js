// Dependancies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

// Import styles via Webpack
import './css/style.css';

// Components
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// Repo name for hosting on Github pages
const repo = `/${window.location.pathname.split('/')[1]}`;

// Component
const Root = () => {
  return (
    <BrowserRouter basename={repo} >
      { /* Looks like Match cannot be a direct child of BrowserRouter */ }
      <div>
        <Match exactly pattern='/' component={ StorePicker } />
        <Match pattern='/store/:storeId' component={ App } />
        <Miss component={ NotFound }/>
      </div>
    </BrowserRouter>
  )
}

render(<Root/>, document.querySelector('#main'));
