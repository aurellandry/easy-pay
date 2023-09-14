import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App';
import PrivateRoute from './components/PrivateRoute';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index={true} path='/' element={ <HomeScreen /> } />
      <Route path='/login' element={ <LoginScreen /> } />
      <Route path='/register' element={ <RegisterScreen /> } />
      {/* Private routes */}
      <Route path='' element={ <PrivateRoute /> } >
        <Route path='/dashboard' element={ <DashboardScreen /> } />
        <Route path='/profile' element={ <ProfileScreen /> } />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={ router } />
    </React.StrictMode>
  </Provider>
)
