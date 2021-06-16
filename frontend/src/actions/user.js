import { ALL_COMPLAINTS, CURRENT_USER, FAIL } from './types';
import api from '../utils/api';
import { resetall } from './status';

export const loaduser = msg => dispatch => {
  dispatch({
    type: CURRENT_USER,
    payload: msg
  });
};

export const getallcomplaints = () => async dispatch => {
  try {
    const res = await api.get('/user/allcomplaints');
    dispatch({
      type: ALL_COMPLAINTS,
      payload: res.data
    });
  }
  catch (err) {
    console.error(err.message);
    dispatch({
      type: FAIL
    })
  }
};

export const reportuser = ( x , name , username) => async dispatch => {
  const data = { x, name, username }
  try {
    const res = await api.post('/user/reportuser',data);
    if (res.data.msg) {
      dispatch(resetall('User Reported Successfully Admin will Look into it', 'success', 'REPORT_IT'));
    }
  }
  catch (err) {
    console.error(err.message);
    dispatch({
      type: FAIL
    })
  }
};

export const deleteuserreport = (_id) => async dispatch => {
  const data = {_id}
  try{
    const res = await api.post('/user/deleteuserreport',data);
    if(res.data.msg){
      dispatch(getallcomplaints());
    }
  }
  catch(err){
    console.error(err.message);
    dispatch({
      type:FAIL
    });
  }
}

export const getallusers = () => async dispatch => {
  try{
    const res = await api.get('/user/allusers');
    dispatch({
      type:ALL_COMPLAINTS,
      payload:res.data
    })
  }
  catch(err){
    console.error(err.message);
    dispatch({
      type:FAIL
    })
  }
}

export const deleteuser = (_id , name ) => async dispatch => {
  const data = { _id , name }
  try{
    const res = await api.post('/user/deleteuser',data);
    dispatch(resetall('Deleted User','success','DELETE_IT'));
  }
  catch(err){
    console.error(err.message);
    dispatch({
      type:FAIL
    })
  }
}

export const reportstatus = (_id,status) => async dispatch => {
  const data = { _id , status}
  try{
    const res = await api.post('/user/reportstatus',data);
    dispatch(getallcomplaints());
  }
  catch(err){
    console.error(err.message);
    dispatch({
      type:FAIL
    })
  }
}