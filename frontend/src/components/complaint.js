import { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { unmountit, deletereport } from '../actions/phone';
import { deleteuserreport, getallcomplaints } from '../actions/user';
import Alert from '../components/alerts';

const Report = ({ allreports, unmountit, users , client , getallcomplaints , deleteuserreport , deletereport }) => {
    useEffect(() => {
        getallcomplaints();
        return () => {
            unmountit();
        }
    }, [getallcomplaints , unmountit])
    const lis = [];
    const [type,changetype] = useState('');
    if(type === 'user'){
        users.ress.forEach((rep) => {
            if(rep.name === client){
                lis.push(<div style={{ border: "3px", borderStyle: "solid", borderColor: "black", borderRadius: "7px", padding: "3%", margin: "3% 0" }}>
                <h6 style={{ color: "black" }}>You Reported {rep.fraudname}</h6>
                <h6 style={{ color: "black" }}>At {rep.date}</h6>
                <h5 style={{ color: "black" }}>{rep.description}</h5>
                <h5 style={{ color: "black" }}>Status : {rep.status === 'Rejected' ? <span style={{ color: "red" }}>{rep.status}</span> : rep.status === 'Resolved' ? <span style={{ color: "green" }}>{rep.status}</span> : <span style={{ color: "yellow" }}>{rep.status}</span>}</h5>
                <br />
                <input type="button" className="btn btn-danger" value="Delete" onClick={() => { deleteuserreport(rep._id); }} />
            </div>
            ) 
            }
        })
    }
    else if(type === 'phone'){
    allreports.ress.forEach((pro) => {
        pro.reports.forEach((rep) => {
            if (rep.user === localStorage.getItem('id')) {
                lis.push(<div style={{ border: "3px", borderStyle: "solid", borderColor: "black", borderRadius: "7px", padding: "3%", margin: "3% 0" }}>
                    <h6 style={{ color: "black" }}>By {rep.name}</h6>
                    <h6 style={{ color: "black" }}>At <Moment format="DD/MM/YYYY">{rep.date}</Moment></h6>
                    <h5 style={{ color: "black" }}>Device Name : {rep.phname}</h5>
                    <h5 style={{ color: "black" }}>{rep.description}</h5>
                    <h5 style={{ color: "black" }}>Status : {rep.status === 'Rejected' ? <span style={{ color: "red" }}>{rep.status}</span> : rep.status === 'Resolved' ? <span style={{ color: "green" }}>{rep.status}</span> : <span style={{ color: "yellow" }}>{rep.status}</span>}</h5>
                    <br />
                    <input type="button" className="btn btn-danger" value="Delete" onClick={() => { deletereport(pro._id, rep._id); }} />
                </div>
                )
            }
        })
    });
}
    return <div className="reporteddevice">
    <Dropdown>
        <Dropdown.Toggle varient="success" id="dropdown-basic">Select Type of complaint</Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => {changetype('phone');}}>Phone</Dropdown.Item>
            <Dropdown.Item onClick={() => {changetype('user');}}>User</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    <br/>
        {lis.length && <h4 style={{ color: "red" }}>Total of <span>{lis.length}</span> {type} Complaints</h4>}
        <Alert />
        {(type === 'user' || type === 'phone') && lis.length < 1 ? (
            <h3 style={{ color: "red", textAlign: "center" }}>No {type} complaints</h3>

        ) : (
            lis
        )}
    </div>
}
const mapStateToProps = state => ({
    allreports: state.phone,
    client : state.auth.user.name,
    users: state.users
});

export default connect(mapStateToProps, { deleteuserreport,getallcomplaints,deletereport, unmountit })(Report);
