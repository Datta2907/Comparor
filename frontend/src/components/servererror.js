import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { resetall } from '../actions/status';
import { FAIL } from '../actions/types';

const Errorpage = ({ failed  , resetall}) => {
    useEffect(() => {
        resetall('','',FAIL);
    },[resetall]);

    if (!failed) {
        return <Redirect to="/home" />;
    }
    else {
        return <div class="full-screen">
            <div class='container'>
                <span class="error-num">5</span>
                <div class='eye'></div>
                <div class='eye'></div>
                <h4 class="sub-text">Oh eyeballs! Something went wrong. We're looking to see what happened.</h4>
                <br />
                <br />
                <br />
                <h6 style={{ display: "inline-block" }}>Redirecting to Home now<div class="dot-spin"></div></h6>
            </div>
        </div>
    }
}

const mapStatetoProps = state => ({
    failed: state.status.failer
})

export default connect(mapStatetoProps, { resetall })(Errorpage);