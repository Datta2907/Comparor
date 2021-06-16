import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import phone from './phone';
import status from './action';
import report from './report';
import users from './users';

const rootreducer = combineReducers({
  alert,
  auth,
  phone,
  status,
  report,
  users
});

export default rootreducer;