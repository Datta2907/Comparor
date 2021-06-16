import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import PropTypes from 'prop-types';
import  Alert  from './alerts';

const Login = ({login , failed , isAuthenticated }) => {
    const [view , changeview] = useState(false);
    const [formdata , setformdata] = useState({
        email:'',
        password:''
    });

    if(isAuthenticated){
        return <Redirect to="/home" />;
    }
    else if(failed){
        return <Redirect to="/home/error" />;
    }
    const { email , password } = formdata;

    const changeit = (e) => {
        setformdata({...formdata,[e.target.name]: e.target.value});
    }
    const justSubmit = e => {
        e.preventDefault();
        login( email , password);
    }
    return (
        <div className="backcol">
            <div className="loginmiddle">
                <form onSubmit={justSubmit}>
                    <h3 style={{ textAlign: "center" }}>Login</h3>
                    <br />
                    <Alert />
                    <label>Email address</label>
                    <input type="email" className="login-form" name="email" onChange={changeit} placeholder="Enter email" autoComplete="off" required/>
                    <label>Password</label>
                    <input type= {view ? 'text':"password"} className="login-form" name="password" onChange={changeit} placeholder="Password" required/>
                    <i onClick={() => {changeview(!view);}} style={{ color: view ? 'blue' : null}} className="fas fa-eye pos logineye"></i>
                    <input type="submit" className="btn btn-primary btn-block" style={{ margin: "6% 0" ,height:"7%"}} value="Login" />
                </form>
                <h5>Don't Have an Account ? <Link to="/register">Register</Link></h5>
            </div>
        </div>
    );
}

Login.prototypes = {
    login : PropTypes.func.isRequired,
    isAuthenticated : PropTypes.bool.isRequired
};

const mapstatetoprops = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    failed : state.status.failer
});
export default connect(mapstatetoprops, { login })(Login) ;