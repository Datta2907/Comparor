import report from './components/report';
import home from './components/home';
import deleteit from './components/delete';
import add from './components/add';
import update from './components/update';
import admin from './components/admin';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar';
import login from './components/login';
import register from './components/register';
import viewreport from "./components/viewreports";
import reportfull from './components/reportfull';
import settings from './components/settings';
import { useEffect } from 'react';
import  PrivateRoute  from './components/PrivateRoute';
import reportuser from './components/reportuser';
import './App.css';

// Redux

import { Provider } from 'react-redux';
import store from './store';
import { loaduser } from './actions/auth';
import complaint from './components/complaint';
import servererror from './components/servererror';
import deleteuser from './components/deleteuser';

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('id')) {
      store.dispatch(loaduser(localStorage.getItem('id')));
    }
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
          <Route exact path="/register" component={register} />
          <Route exact path="/home/error" component={servererror} />
          <PrivateRoute exact path="/home" component={admin} />
          <PrivateRoute exact path="/home/add" component={add} />
          <PrivateRoute exact path="/home/update" component={update} />
          <PrivateRoute exact path="/home/delete" component={deleteit} />
          <PrivateRoute exact path="/home/reports" component={viewreport} />
          <PrivateRoute exact path="/home/reportdevice" component={report} />
          <PrivateRoute exact path="/home/complaints" component={complaint} />
          <PrivateRoute exact path="/home/report/:phoneid" component={reportfull} />
          <PrivateRoute exact path='/home/user/settings' component={settings} />
          <PrivateRoute exact path='/home/reports/user' component={reportuser} />
          <PrivateRoute exact path='/home/user/deleteuser' component={deleteuser} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
