import { Link, Redirect } from 'react-router-dom';
import { useState } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import { setAlert } from '../actions/alert';
import Alert from './alerts';


const SignUp = ({ isAuthenticated, setAlert, register , failed }) => {
    const [view, changeview] = useState(false);
    const [viewone , changeviewone] = useState(false);
    const [formdata, setformdata] = useState({
        name: '',
        email: '',
        password: '',
        repassword: ''
    });
    if (isAuthenticated) {
        return <Redirect to="/home" ></Redirect>;
    }
    else if (failed) {
        return <Redirect to="/home/error" ></Redirect>;
    }
    const { name, email, password, repassword } = formdata;

    const changeit = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    }
    const justSubmit = async (e) => {
        e.preventDefault();
        if (password === repassword) {
            if (password.length < 7) {
                setAlert('Password Must have Min 6 characters', 'danger');
            }
            else {
                register({ name, email, password });
            }
        }
        else {
            setAlert('Passwords Doesnt Match', 'danger');
        }
    }
    return (
        <div className="backcol">
            <div className="loginmiddle">
                <form onSubmit={justSubmit}>
                    <h3 style={{ textAlign: "center" }}>Register</h3>
                    <br />
                    <Alert />
                    <label>Name</label>
                    <input type="text" className="login-form" name="name" onChange={changeit} autoComplete="off" required />
                    <label>Email address</label>
                    <input type="email" className="login-form" name="email" onChange={changeit} autoComplete="off" required />
                    <label>Password</label>
                    <input type={view ? 'text' : 'password'} className="login-form" name="password" onChange={changeit} required />
                    <i onClick={() => { changeview(!view); }} style={{ color: view ? 'blue' : null }} className="fas fa-eye pos logineye"></i>
                    <label>Re-Enter Password</label>
                    <input type={viewone ? 'text' : 'password'} className="login-form" name="repassword" onChange={changeit} required />
                    <i onClick={() => { changeviewone(!viewone); }} style={{ color: viewone ? 'blue' : null }} className="fas fa-eye pos logineye"></i>
                    <br />
                    <input type="submit" className="btn btn-primary btn-lg btn-block" value="Register" />
                </form>
                <p>Already Have an Account ? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    failed: state.status.failer
})

export default connect(mapStateToProps, { setAlert, register })(SignUp);