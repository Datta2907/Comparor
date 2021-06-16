import { useState } from 'react';
import { connect } from 'react-redux';

const Phonedetails = ({ devices }) => {
    let x = 1;
    const lis = [];
    const [count, changecount] = useState(0);
    const [tog, changetog] = useState(false);
    const [valone, chanvalone] = useState('');
    const [phone, changeit] = useState({
        name: '',
        network: '',
        image: '',
        Launch: '',
        Dimensions: '',
        sim: '',
        distype: '',
        size: '',
        resolution: '',
        os: '',
        chipset: '',
        gpu: '',
        cpu: '',
        memory: '',
        frontcamera: '',
        backcamera: '',
        video: '',
        battery: '',
        colours: ''
    });
    while (x !== 0) {
        devices.ress.forEach((pro) => {
            if (pro.name.includes(valone)) {
                lis.push(<div className="queryres" onClick={() => { changecount(1); changetog(false); changeit(pro); chanvalone(''); }} ><h3 style={{ margin: '0' }}>{pro.name}</h3></div>);
            }
        });
        if (lis.length < 1) {
            lis.push(<h3>No Results Found</h3>)
        }
        x = 0;
    }

    const showit = (e) => {
        if (e.target.value === "") {
            changetog(false);
        }
        else {
            changetog(true);
        }
        chanvalone(e.target.value);
    }


    return (
        <div style={{ display: "inline-block", margin: "0 9%", width: "30%" }}>
            <input type="text" onChange={showit} style={{ display: "block", width: "100%", textAlign: 'center', height: '8%', border: 'none', borderRadius: '5px' }} value={valone} placeholder="Search For a Device..." />
            <div className="search" style={{ width: "30%", height: "30%", position: 'absolute', backgroundColor: 'gray', zIndex: tog === true ? '1' : '0', display: tog === true ? 'block' : 'none', borderBottomLeftRadius: '7px', borderBottomRightRadius: '7px' }}>
                {lis}
            </div>
            <div style={{ position: 'absolute', marginTop: "5%", borderRadius: '8px', paddingLeft: '3%', width: "30%", zIndex: tog === true ? '0' : '1', backgroundColor: count === 0 ? "black" : "F2DF49" }}>
                <br />
                <img
                    style={{ width: "90%", borderRadius: '5px', paddingBottom: "4%", display: count === 0 ? 'none' : 'block' }}
                    src={phone.photo} alt="..pic" />
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }}>Name : {phone.name}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }}>Network : {phone.network}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }}>Launch : {phone.launch}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }}>Dimensions : {phone.dimensions}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Sim: {phone.sims}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >DisType : {phone.display}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Size : {phone.size}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Resolution : {phone.resolution}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Os : {phone.os}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Chipset : {phone.chipset}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >GPU : {phone.gpu}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >CPU : {phone.cpu}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Frontcamera : {phone.frontcamera}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Backcamera : {phone.backcamera}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Video : {phone.video}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Battery : {phone.battery}</h4>
                <br />
                <h4 style={{ color: count === 0 ? "black" : "white", display: count === 0 ? 'none' : 'block' }} >Colours : {phone.colors}</h4>
            </div>
        </div>
    );
}


const mapStateToProps = state => ({
    devices: state.phone
});


export default connect(mapStateToProps, {})(Phonedetails);