// Packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes as Switch} from 'react-router-dom'
import {createStore, compose, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {checkToken} from './actions'

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
import RequireAuth from './components/RequireAuth'
import SignOut from './components/auth/SignOut'
import ProfilePage from './components/auth/ProfilePage'
import SearchLocation from './components/SearchLocation'
import {persistStore, persistReducer} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'  //local storage for this domain : localhost:3000
import Nearby from './components/Nearby';



const persistConfig = {
  key:'root',
  storage 

}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer,
  compose(applyMiddleware(reduxThunk), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

let persistor = persistStore(store)

store.dispatch(checkToken())

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  




  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Router>
        <NavigationBar>
          <Switch>
            <Route path="/" element={<App/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/nearby" element={<RequireAuth> <Nearby /> </RequireAuth>} />
            <Route path="/searchLocation" element={<RequireAuth> <SearchLocation /> </RequireAuth>} />
            {/* <Route path="/profilepage" element={<RequireAuth> <ProfilePage /> </RequireAuth>} /> */}
            <Route path="/favorites" element={<RequireAuth> <Favorites /> </RequireAuth>} />
            <Route path="/signout" element={<SignOut/>} />
          </Switch>
        </NavigationBar>
      </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
