import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';
import "./css/style.css";

render (
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.querySelector('#main')
);
