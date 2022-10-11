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

let store = createStore(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" element={<App/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/favorites" element={<Favorites/>} />
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>
);
