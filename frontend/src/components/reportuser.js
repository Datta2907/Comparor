import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reportuser } from '../actions/user';
import { Redirect } from 'react-router-dom';
import Alert from './alerts';
import { setAlert } from '../actions/alert';
import { getallusers } from '../actions/user';

const Phonedetails = ({ client, users, reportuser, reported, setAlert, getallusers, failed }) => {
    useEffect(() => {
        getallusers();
    }, [getallusers])
    const lis = [];
    const [namee, changename] = useState('Select User');
    const [valone, chanvalone] = useState('');
    const [x, changex] = useState('');
    const [username, changeusername] = useState('');

    if (reported) {
        return <Redirect to="/home" />;
    }
    else if (failed) {
        return <Redirect to="/home/error" />;
    }
    users.ress.forEach((user) => {
        if (user.name.includes(valone) && valone !== "") {
            lis.push(<Dropdown.Item onClick={() => { changename(user.name); chanvalone(''); changeusername(user.name); }} ><h3 style={{ margin: '0' }}>{user.name}</h3></Dropdown.Item>);
        }
    });

    const changeit = (e) => {
        changex(e.target.value);
    }

    const showit = (e) => {
        chanvalone(e.target.value);
    }
    const justsubmit = (e) => {
        window.screenTop = 0;
        e.preventDefault();
        if (x.length === 0) {
            setAlert(`Complaint Can't be Empty`, 'danger');
        }
        else if (namee.length === 0 || namee === 'Select User') {
            setAlert('Please Select a User', 'danger');
        }
        else {
            reportuser(x, client.user.name, username);
        }
    }

    return (
        <div>
            <form onSubmit={justsubmit}>
                <Alert />
                <Dropdown>
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className="reportsearch">
                        {namee}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="reportresult">
                        <input type="text" style={{ width: "97%", height: "30%", marginLeft: "2%" }} onChange={showit} placeholder="Search a Device..." value={valone}></input>
                        {lis}
                    </Dropdown.Menu>
                </Dropdown>
                <textarea placeholder="Your Complaint...." style={{ margin: "0 24%", width: "50%", height: "40%" }} onChange={changeit} value={x}></textarea>
                <input type="submit" className="btn btn-dark btn-lg" style={{ width: "50%", margin: "2% 24%" }} value="Report" />
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    client: state.auth,
    users: state.users,
    reported: state.status.reportit,
    failed: state.status.failer
})

export default connect(mapStateToProps, { reportuser, setAlert, getallusers })(Phonedetails);