import { useEffect } from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { unmountit , updatestatus }from '../actions/phone';
import Alert from '../components/alerts';
import Spinner from './spinner';
import { useParams } from 'react-router-dom';

const Report = ({ loaded , allreports , unmountit , updatestatus }) => {
    const { phoneid } = useParams();
    useEffect(() => {
        return () => {
            unmountit();
        }
    },[unmountit])
    const lis = [];
    if (loaded) {
        return <div className="reporteddevice">
            {allreports.reports.length && <h4 style={{ color: "red" }}>Total of <span>{allreports.reports.length}</span> Reports</h4>}
            <Alert />
            {allreports.reports.length < 1 ? (
                <h3 style={{ color: "red", textAlign: "center" }}>No Reports For This Device</h3>

            ) : (
                allreports.reports.forEach((pro) => {
                    lis.push(<div style={{ border: "3px", borderStyle: "solid", borderColor: "black", borderRadius: "7px", padding: "3%", margin: "3% 0" }}>
                        <h6 style={{ color: "black" }}>By {pro.name}</h6>
                        <h6 style={{ color: "black" }}>At <Moment format="DD/MM/YYYY" >{pro.date}</Moment></h6>
                        <h5 style={{ color: "black" }}>Device Name : {pro.phname}</h5>
                        <h5 style={{ color: "black" }}>{pro.description}</h5>
                        <h5 style={{ color: "black" }}>Status : {pro.status === 'Rejected' ? <span style={{ color: "red" }}>{pro.status}</span> : pro.status === 'Resolved' ? <span style={{ color: "green" }}>{pro.status}</span> :  <span style={{ color: "yellow" }}>{pro.status}</span>}</h5>
                        <br />
                        <input type="button" className="btn btn-warning" value="Resolve" onClick={() => { updatestatus( phoneid , pro._id,'resolve'); }}/>
                    &nbsp;&nbsp;&nbsp;
                <input type="button" className="btn btn-danger" value="Delete" onClick={() => { updatestatus( phoneid , pro._id,'reject'); }} />
                    </div>
                    )
                })
            )
            }
            {lis}
        </div>
    }
    else {
        return <Spinner />
    }
}
const mapStateToProps = state => ({
    allreports: state.report.payload,
    loaded: state.report.loading
});

export default connect(mapStateToProps, { updatestatus , unmountit})(Report);
