import { UPDATE_IT, ADD_IT, DELETE_IT, RESET ,REPORT, FAIL} from '../actions/types';

const initialState = {
    addit: false,
    updateit: false,
    deleteit: false,
    reportit: false,
    failer : false
};

function statusReducer(state = initialState, action) {
    const { type } = action;

    switch (type) {
        case UPDATE_IT:
            return {
                addit: false,
                updateit: true,
                deleteit: false,
                reportit: false,
                failer : false
            };
        case ADD_IT:
            return {
                addit: true,
                updateit: false,
                deleteit: false,
                reportit: false,
                failer : false
            };
        case DELETE_IT:
            return {
                addit: false,
                updateit: false,
                deleteit: true,
                reportit: false,
                failer : false
            }
        case REPORT:
            return{
                addit: false,
                updateit: false,
                deleteit: false,
                reportit: true,
                failer : false
            }
        case FAIL:
            return{
                addit: false,
                updateit: false,
                deleteit: false,
                reportit: false,
                failer : true
            }
        case RESET:
            return {
                addit: false,
                updateit: false,
                deleteit: false,
                reportit: false,
                failer:false
            }
        
        default:
            return state;
    }
}

export default statusReducer;