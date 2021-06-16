import {
    ALL_COMPLAINTS
}
    from '../actions/types';

const initialState = {
    isloading : false,
    ress : []
};

function userreducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ALL_COMPLAINTS:
            return {
                ress:payload,
                isloading:true
            };
        default:
            return state;
    }

}

export default userreducer;