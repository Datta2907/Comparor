import { REPORT_IT , UNREPORT_IT } from '../actions/types';

const initialState = {
    loading : false,
}


function reportreducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REPORT_IT:
            return {
                payload,
                loading : true
            };
        case UNREPORT_IT:
            return{
                loading: false,
                data : []
            }
        default:
            return state;
    }

}

export default reportreducer;