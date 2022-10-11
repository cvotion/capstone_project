// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom'
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'

// Styles
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import NavigationBar from './navigation/NavigationBar'

// Components
import App from './App';
import Favorites from './components/Favorites'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import reduxThunk from 'redux-thunk'
import reducer from './reducers/reducer'

let store = createStore(reducer, {},
  compose(applyMiddleware(reduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(




  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <NavigationBar>
          <Switch>
            <Route path="/" element={<App/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/favorites" element={<Favorites/>} />
          </Switch>
        </NavigationBar>
      </Router>
    </Provider>
  </React.StrictMode>
);
