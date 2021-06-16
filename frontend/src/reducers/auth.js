import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT,
    LOADUSER
  } from '../actions/types';
  
  const initialState = {
    token : '',
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
  function authReducer(state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case LOADUSER:
        return{
          ...state,
          ...payload,
          token:localStorage.getItem('id'),
          isAuthenticated: true,
          loading: false
        }
      case REGISTER_SUCCESS:
      case LOGIN_SUCCESS:
        return {
          ...state,
          ...payload,
          token:localStorage.getItem('id'),
          isAuthenticated: true,
          loading: false
        };
      case LOGOUT:
        return {
          ...state,
          token : null,
          isAuthenticated: false,
          loading: false,
          user: null
        };
      default:
        return state;
    }
  }
  
  export default authReducer;