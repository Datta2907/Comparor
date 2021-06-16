import { SET_ALERT, REMOVE_ALERT , RESET} from './types';

export const resetall = (msg, alertType, statustype , timeout=3000) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType}
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeout);
  setTimeout(() => dispatch({ type: statustype }),timeout);
  setTimeout(() => dispatch({ type: RESET }),timeout);
};