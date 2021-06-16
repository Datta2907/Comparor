import {
    ALL_PHONES
}
    from '../actions/types';

const initialState = {
    isloading : false,
    ress : []
};

function phonereducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case ALL_PHONES:
            return {
                ress:payload,
                isloading:true
            };
        default:
            return state;
    }

}

export default phonereducer;