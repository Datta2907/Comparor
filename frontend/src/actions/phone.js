import api from '../utils/api';
import { setAlert } from '../actions/alert';
import { resetall } from '../actions/status';
import { ALL_PHONES, REPORT_IT, UNREPORT_IT,FAIL } from './types';

export const adddevice = data => async dispatch => {
  try {
    const res = await api.post('/user/add', data);
    if (res.data.err) {
      dispatch(setAlert('Device Exists', 'danger'));
    }
    else {
      dispatch(resetall('Added Succesfully ', 'success', 'ADD_IT'));
    }
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: FAIL
    });
  }
}


export const getallphones = () => async dispatch => {
  try {
    const res = await api.get('/user');
    dispatch({
      type: ALL_PHONES,
      payload: res.data
    });
  }
  catch (err) {
    console.log(err);
    dispatch({
      type: FAIL
    });
  }
}

export const updatedevice = data => async dispatch => {
  try {
    const res = await api.post('/user/update', data);
    if (res.data) {
      dispatch(resetall('Updated Succesfully ', 'success', 'UPDATE_IT'));
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: FAIL
    });
  }
}

export const deletedevice = data => async dispatch => {
  try {
    const res = await api.post('/user/deletedevice', data);
    if (res.data) {
      dispatch(resetall('Deleted Successfully ', 'success', 'DELETE_IT'))
    }
  }
  catch (err) {
    console.error(err);
    dispatch({
      type: FAIL
    });
  }
}

export const getreports = (_id) => async dispatch => {
  const data = { _id }
  try {
    const res = await api.post('/user/getreports', data);
    dispatch({
      type: REPORT_IT,
      payload: res.data
    });
  }
  catch (err) {
    console.error(err);
    dispatch({
      type: FAIL
    });
  }
}

export const addreport = (_id, x, token, name, proname) => async dispatch => {
  const body = { _id, x, token, name, proname }
  try {
    const res = await api.post('/user/reportdevice', body);
    if (res.data) {
      dispatch(resetall('Received Report User/Admin will look into it', 'success', 'REPORT'))
    }
  }
  catch (err) {
    console.error(err);
    dispatch({
      type : FAIL
    });
  }
}

export const unmountit = () => async dispatch => {
  dispatch({ type: UNREPORT_IT });
}

export const updatestatus = (_id, reportid, type) => async dispatch => {
  const body = { _id, reportid, type }
  try {
    const res = await api.post('/user/updatestatus', body);
    if (res.data.msg === "Done") {
      dispatch({
        type: UNREPORT_IT
      });
      dispatch(getreports(_id));
    }
  }
  catch (err) {
    console.error(err);
    dispatch({
      type: FAIL
    });
  }
}

export const deletereport = (phoneid, reportid) => async dispatch => {
  const body = { phoneid, reportid }
  try {
    const res = await api.post('/user/deletereport', body);
    if (res.data.msg === "Done") {
      dispatch(getallphones());
    }
  }
  catch (err) {
    console.error(err);
    dispatch({
      type: FAIL
    });
  }
}