import { Link, } from "react-router-dom";
import { connect } from 'react-redux';
import { getallphones } from '../actions/phone';
import { useEffect } from "react";

const Admin = ({ user , getallphones }) => {
    useEffect(() => {
        getallphones();
    },[getallphones]);
    return <div>
        <h3 style={{ margin: "1%" }}>Welcome {user.name}</h3>
        <div className="adminhome">
            <Link to="/home/add" className="btn btn-success btn-lg btn-block homebutton">New Device</Link>
            <Link to="/home/update" className="btn btn-primary btn-lg btn-block homebutton">Update Device</Link>
            <Link to="/home/delete" className="btn btn-danger btn-block btn-lg homebutton">Delete Device</Link>
            <Link to="/home/reportdevice" className="btn btn-warning btn-block btn-lg homebutton">Report Device</Link>
            <Link to="/home/complaints" className="btn btn-secondary btn-block btn-lg homebutton">Your Complaints</Link>
            <Link to="/home/reports" className="btn btn-lg btn-block btn-info homebutton">Reports</Link>
            <Link to="/home/reports/user" className="btn btn-lg btn-block btn-dark homebutton">Report User</Link>
            {user.usertype === 'Admin' && <Link to="/home/user/deleteuser" className="btn-danger btn btn-lg btn-block homebutton" >Delete User</Link>}
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    user : state.auth.user,
});

export default connect(mapStateToProps , { getallphones })(Admin);