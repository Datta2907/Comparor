import { useEffect, useState } from "react";
import Moment from 'react-moment';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { getreports } from "../actions/phone";
import { Dropdown } from "react-bootstrap";
import { getallcomplaints,reportstatus } from "../actions/user";

const Viewreport = ({ phones, getreports, usertype, reports, getallcomplaints,reportstatus }) => {
    useEffect(() => {
        getallcomplaints();
    },[getallcomplaints])
    const lis = [];
    const [key, changekey] = useState('');
    const [log, changelog] = useState(false);
    const [type, changetype] = useState('');
    if (usertype === 'Admin') {
        if (type === 'phone') {
            phones.ress.forEach((prom) => {
                prom.reports.forEach((pro) => {
                lis.push(<div className="deviceinreported" onClick={() => { changelog(true); changekey(prom._id); }}>
                    <h2 >{pro.phname}</h2>
                </div>);
                });
            });
        }
        else if (type === 'user') {
            reports.ress.forEach((pro) => {
                lis.push(
                <div style={{ border: "3px", borderStyle: "solid", borderColor: "black", borderRadius: "7px", padding: "3%", margin: "3% 0" }}>
                        <h3 style={{ color: "black" }}>{pro.name} Reported {pro.fraudname}</h3>
                        <h6 style={{ color: "black" }}>At <Moment format="DD/MM/YYYY" >{pro.date}</Moment></h6>
                        <h5 style={{ color: "black" }}>Reason : {pro.description}</h5>
                        <h5 style={{ color: "black" }}>Status : {pro.status === 'Rejected' ? <span style={{ color: "red" }}>{pro.status}</span> : pro.status === 'Resolved' ? <span style={{ color: "green" }}>{pro.status}</span> :  <span style={{ color: "yellow" }}>{pro.status}</span>}</h5>
                        <br />
                        <input type="button" className="btn btn-warning" value="Resolve" onClick={() => { reportstatus( pro._id,'Resolved'); }}/>
                    &nbsp;&nbsp;&nbsp;
                <input type="button" className="btn btn-danger" value="Delete" onClick={() => { reportstatus( pro._id,'Rejected'); }} />
                    </div>);
                
            });
        }
    }
    else if (usertype === 'User') {
        phones.ress.forEach((pro) => {
            if (pro.user === localStorage.getItem('id')) {
                lis.push(<div className="deviceinreported" onClick={() => { changelog(true); changekey(pro._id); }}>
                    <h2 >{pro.name}</h2>
                </div>);
            }
        });
    }
    if (log) {
        getreports(key);
        return <Redirect to={`/home/report/${key}`} />
    }
    if (lis.length) {
        return <div className="reporteddevice">
            {lis}
        </div>
    }
    else {
        return <div className="reporteddevice">
            {usertype === 'Admin' &&
                <Dropdown>
                    <Dropdown.Toggle varient="success" id="dropdown-basic">Select Type of Reports</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { changetype('phone'); }}>Phone</Dropdown.Item>
                        <Dropdown.Item onClick={() => { changetype('user'); }}>User</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>}
            <br />
            <h3 style={{ color: "red", textAlign: "center" }}>No Reports</h3>
        </div>
    }
}
const mapStateToProps = state => ({
    phones: state.phone,
    usertype: state.auth.user.usertype,
    reports: state.users
})

export default connect(mapStateToProps, { getreports , getallcomplaints,reportstatus})(Viewreport);