import { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deletedevice } from '../actions/phone';
import Alert from '../components/alerts';

const Phonetwo = ({ phones, deleted, deletedevice, failed, usertype }) => {
    const lis = [];
    const [show, changeshow] = useState(false);
    const [tog, changetog] = useState(false);
    const [valtwo, chanvaltwo] = useState('');
    const [phone, changeit] = useState({
        _id: '',
        photo: '',
        name: '',
    });
    const { _id } = phone;
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
        deletedevice({ _id });
    }

    phones.ress.forEach((pro) => {
        if (usertype === 'Admin') {
            if (pro.name.includes(valtwo) && valtwo !== "") {
                lis.push(<div className="deletelis" onClick={(e) => { changetog(false); chanvaltwo(''); changeshow(true); changeit(pro); }}><h3 style={{ margin: '0' }}>{pro.name}</h3></div>);
            }
        }
        else {
            if (pro.name.includes(valtwo) && valtwo !== "" && pro.user === localStorage.getItem('id')) {
                lis.push(<div className="deletelis" onClick={(e) => { changetog(false); chanvaltwo(''); changeshow(true); changeit(pro); }}><h3 style={{ margin: '0' }}>{pro.name}</h3></div>);
            }
        }
    });

    return (
        <div style={{ margin: "0 30%" }}>
            <p style={{ textAlign: "center" }}>Note : You can delete only those devices that you created</p>
            <Alert />
            <input type="text" onChange={showtwo} style={{ width: "100%", marginTop: "2%", height: "3rem", border: "none", borderRadius: "5px", textAlign: "center" }} value={valtwo} placeholder="Search For a Device..." />
            <div style={{ position: "absolute", width: "40%", height: "40%", overflow: "auto", backgroundColor: "grey", border: "none", borderRadius: "10px", marginTop: "5px", zIndex: tog === true ? '1' : '0', display: tog === true ? 'block' : 'none' }}>
                {lis}
            </div>
            {show && <div style={{ position: "absolute", width: "40%", zIndex: tog === true ? '0' : '1' }}>
                <form onSubmit={justsubmit}>
                    <br />
                    <img
                        style={{ width: "100%", borderRadius: '5px', paddingBottom: "4%" }}
                        src={phone.photo} alt="..pic" />
                    <br />
                    <h1>Name : &nbsp;&nbsp;&nbsp;{phone.name}</h1>
                    <br />
                    <h1>Launch : &nbsp;&nbsp;&nbsp;{phone.launch}</h1>
                    <br />
                    <h1>Storage : &nbsp;&nbsp;&nbsp;{phone.storage}</h1>
                    <br />
                    <h1>Chipset : &nbsp;&nbsp;&nbsp;{phone.chipset}</h1>
                    <br />
                    <input type="submit" className="btn btn-danger btn-block" value="Delete" />
                </form>
            </div>}
            <br />
        </div>
    );
}
const mapStateToProps = state => ({
    phones: state.phone,
    deleted: state.status.deleteit,
    failed: state.status.failer,
    usertype: state.auth.user.usertype
});

export default connect(mapStateToProps, { deletedevice })(Phonetwo);