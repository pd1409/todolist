import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { configureServer } from './server';


configureServer();

render(
    <App />,
    document.getElementById('root')
);