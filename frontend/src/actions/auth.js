import api from '../utils/api';
import { setAlert } from './alert';
import { resetall } from './status';
import {
  REGISTER_SUCCESS,
  FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  LOADUSER
} from './types';

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await api.post('/auth/register', formData);
    if (res.data.err) {
      dispatch(setAlert('User Exists', 'danger'));
    }
    else {
      const id = res.data.user._id.toString();
      localStorage.setItem('id', id);
      if (localStorage.getItem('id')) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data
        });
      }
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: FAIL
    });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const body = { email, password };
  try {
    const res = await api.post("/auth/login", body);
    if (res.data.msg) {
      dispatch(setAlert(`${res.data.msg}`, 'danger'));
    }
    else {
      const id = res.data.user._id.toString();
      localStorage.setItem('id', id);
      if (localStorage.getItem('id')) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        });
      }
    }
  } catch (err) {
    console.error(err);
    dispatch({
      type: FAIL
    });
  }
};

export const loaduser = (tok) => async dispatch => {
  const id = { tok };
  try {
    let res = await api.post('/auth/load', id);
    dispatch({
      type: LOADUSER,
      payload: res.data
    });
  }
  catch (err) {
    dispatch({
      type: FAIL
    });
  }
}

export const logout = () => async dispatch => {
  localStorage.removeItem('id');
  dispatch({
    type: LOGOUT
  });
}

export const changepassword = (oldpass, newpass, token) => async dispatch => {
  const body = { oldpass, newpass, token }
  try {
    const res = await api.post('/auth/changepassword', body);
    if (res.data.msg === "Done") {
      dispatch(resetall('Changed Password', 'success', 'UPDATE_IT'));
    }
    else if (res.data.msg === 'Wrongpassword') {
      dispatch(setAlert('Wrong Current Password', 'danger'));
    }
  }
  catch (err) {
    dispatch({
      type: FAIL
    });
  }
}
