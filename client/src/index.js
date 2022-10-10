// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

// Components
import App from './App';
import Favorites from './components/Favorites'
import Login from './components/Login'
import Register from './components/Register'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
