import { useState } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { setAlert } from '../actions/alert';
import { changepassword } from '../actions/auth';
import Alert from './alerts';

const Changepass = ({ phones, user, updated, changepassword, setAlert, failed }) => {
    const lis = [];
    const [view, changeview] = useState(false);
    const [viewone, changeviewone] = useState(false);
    const [formdata, setformdata] = useState({
        current: '',
        newpass: '',
        newpassone: ''
    });
    const { current, newpass, newpassone } = formdata;
    if (updated) {
        return <Redirect to='/home' />;
    }
    else if (failed) {
        return <Redirect to='/home/error' />;
    }
    const changeit = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    }

    const submitit = (e) => {
        e.preventDefault();
        document.body.scrollTop = 0;
        if (current.length === 0 || newpass.length === 0 || newpassone.length === 0) {
            setAlert('Please Fill the Froms Correctly', 'danger');
        }
        else {
            if (newpass.length < 7) {
                setAlert('Password Length Should Have Min 6 Characters', 'danger');
            }
            else if (newpass !== newpassone) {
                setAlert('Passwords dont Match', 'danger');
            }
            else {
                changepassword(current, newpass, localStorage.getItem('id'));
            }
        }
    }

    phones.ress.forEach((dev) => {
        if (dev.user === localStorage.getItem('id')) {
            lis.push(<div style={{ width: "100%", height: "20%", backgroundColor: "grey", paddingTop: "2%", borderRadius: "5px" }}>{dev.name}</div>)
        }
    });



    return <div style={{ margin: "5% 30%" }}>
        <form onSubmit={submitit}>

            <Alert />
            <br />
            <h3>Hey , {user.name}</h3>
            <label style={{ color: "yellow" }}>Created on : </label><h5><Moment format="DD/MM/YYYY HH:MM" >{user.date}</Moment></h5>
            <label>Owned Devices</label>
            <br />
            {lis.length < 1 ?
                (<div style={{ width: "90%", height: "10%", backgroundColor: "white", borderRadius: "5px", textAlign: "center" }}><span style={{ color: "red", fontSize: "2rem", fontStyle: "italic" }}>No Devices</span></div>)
                :
                (<div style={{ width: "90%", height: "30%", backgroundColor: "white", borderRadius: "5px", textAlign: "center" }}>
                    {lis}
                </div>)
            }
            <br />
            <h3 >Change Password</h3>
            <label >Old Password &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type={view ? 'text' : 'password'} style={{ width: "90%", height: "5%", backgroundColor: 'grey', borderRadius: '5px' }} onChange={changeit} name="current" />
            <i onClick={() => { changeview(!view); }} style={{ color: view ? 'blue' : null }} className="fas fa-eye pos chanpasseye"></i>
            <br /><br />
            <label >New Password &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type={viewone ? 'text' : 'password'} style={{ width: "90%", height: "5%", backgroundColor: 'grey', borderRadius: '5px' }} onChange={changeit} name="newpass" autoComplete="off" />
            <i onClick={() => { changeviewone(!viewone); }} style={{ color: viewone ? 'blue' : null }} className="fas fa-eye pos chanpasseye"></i>
            <br /><br />
            <label >Re-Enter Password &nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type={viewone ? 'text' : 'password'} style={{ width: "90%", height: "5%", backgroundColor: 'grey', borderRadius: '5px' }} onChange={changeit} name="newpassone" autoComplete="off" />
            <br /><br />
            <input type="submit" className="btn btn-success btn-lg" value="Change" />
        </form>
    </div>

}
const mapStateToProps = state => ({
    updated: state.status.updateit,
    user: state.auth.user,
    phones: state.phone,
    failed: state.status.failer
});

export default connect(mapStateToProps, { changepassword, setAlert })(Changepass);
