import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deleteuser , getallusers } from '../actions/user';
import Alert from '../components/alerts';

const Deleteuser = ({ users, deleted, deleteuser ,getallusers, failed}) => {
    useEffect(() => {
        getallusers();
    },[getallusers])
    const lis = [];
    const [show, changeshow] = useState(false);
    const [tog, changetog] = useState(false);
    const [valtwo, chanvaltwo] = useState('');
    const [phone, changeit] = useState({
        _id: '',
        name: '',
        date:''
    });
    const { _id ,name } = phone;
    if (deleted) {
        return <Redirect to='/home' />;
    }
    else if (failed) {
        return <Redirect to='/home/error' />;
    }
    const showtwo = (e) => {
        if (e.target.value === '') {
            changetog(false);
        }
        else {
            changetog(true);
        }
        chanvaltwo(e.target.value);
    }

    const justsubmit = (e) => {
        e.preventDefault();
        document.body.scrollTop = 0;
        deleteuser( _id , name );
    }

    users.ress.forEach((pro) => {
        if (pro.name.includes(valtwo) && valtwo !== "" ) {
            lis.push(<div className="deletelis" onClick={(e) => { changetog(false); chanvaltwo(''); changeshow(true); changeit(pro); }}><h3 style={{ margin: '0' }}>{pro.name}</h3></div>);
        }
    });

    return (
        <div style={{ margin: "0 30%" }}>
            <Alert />
            <input type="text" onChange={showtwo} style={{ width: "100%", marginTop: "2%", height: "3rem", border: "none", borderRadius: "5px", textAlign: "center" }} value={valtwo} placeholder="Search For a Device..." />
            <div style={{ position: "absolute", width: "40%", height: "40%", overflow: "auto", backgroundColor: "grey", border: "none", borderRadius: "10px", marginTop: "5px", zIndex: tog === true ? '1' : '0', display: tog === true ? 'block' : 'none' }}>
                {lis}
            </div>
            {show && <div style={{ position: "absolute", width: "40%", zIndex: tog === true ? '0' : '1' }}>
                <form onSubmit={justsubmit}>
                    <br />
                    <h1>Name : &nbsp;&nbsp;&nbsp;{name}</h1>
                    <br />
                    <h1>Email : &nbsp;&nbsp;&nbsp;{phone.email}</h1>
                    <br />
                    <h3>Created on : &nbsp;&nbsp;&nbsp;{phone.date}</h3>
                    <br />
                    <input type="submit" className="btn btn-danger btn-block" value="Delete" />
                </form>
            </div>}
        </div>
    );
}
const mapStateToProps = state => ({
    users: state.users,
    deleted: state.status.deleteit,
    failed: state.status.failer
});

export default connect(mapStateToProps, { deleteuser , getallusers })(Deleteuser);