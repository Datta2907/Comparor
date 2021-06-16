import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addreport } from '../actions/phone';
import { Redirect } from 'react-router-dom';
import Alert from '../components/alerts';
import { setAlert } from '../actions/alert';

const Phonedetails = ({ client, phones, addreport, reported , setAlert , failed }) => {
    const lis = [];
    const [namee, changename] = useState('Select Device');
    const [valone, chanvalone] = useState('');
    const [_id, changeid] = useState('');
    const [x, changex] = useState('');
    const [proname, changeproname] = useState('');

    if (reported) {
        return <Redirect to="/home" />;
    }
    else if (failed) {
        return <Redirect to="/home/error" />;
    }
    phones.ress.forEach((product) => {
        if (product.name.includes(valone) && valone !== "") {
            lis.push(<Dropdown.Item onClick={() => { changename(product.name); chanvalone(''); changeproname(product.name); changeid(product._id) }} value={product.key}><h3 style={{ margin: '0' }}>{product.name}</h3></Dropdown.Item>);
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
            setAlert(`Complaint Can't be Empty`,'danger');
        }
        else if (namee.length === 0 || namee === 'Select Device') {
            setAlert('Please Select a Device', 'danger')
        }
        else {
            addreport(_id, x, client.token, client.user.name, proname);
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
                <textarea placeholder="Your Complaint...." style={{ margin: "0 24%" ,width:"50%",height:"40%"}} onChange={changeit} value={x}></textarea>
                <input type="submit" className="btn btn-dark btn-lg" style={{ width: "50%", margin: "2% 24%" }} value="Report" />
            </form>
        </div>
    );
}

const mapStateToProps = state => ({
    client: state.auth,
    phones: state.phone,
    reported: state.status.reportit,
    failed: state.status.failer
})

export default connect(mapStateToProps, { addreport , setAlert })(Phonedetails);