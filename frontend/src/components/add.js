import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { adddevice } from '../actions/phone';
import Alert from '../components/alerts';
import { setAlert } from '../actions/alert';

const Add = ({ added , adddevice , setAlert ,failed ,username}) => {
    let devname = '';
    const [ mobiledata , send] = useState({
        tok:localStorage.getItem('id'),
        photo: '',
        name: '',
        network: '',
        launch: '',
        dimensions: '',
        sims: '',
        size: '',
        display: '',
        resolution: '',
        os: '',
        chipset: '',
        frontcamera: '',
        backcamera: '',
        video: '',
        storage: '',
        cpu: '',
        gpu: '',
        battery: '',
        colors: ''
    });

    if(added){
        return <Redirect to="/home" />;
    }
    else if(failed){
        return <Redirect to="/home/error" />;
    }
    const {
        tok,
        photo,
        name,
        network,
        launch,
        dimensions,
        sims,
        size,
        display,
        resolution,
        os,
        chipset,
        frontcamera,
        backcamera,
        video,
        storage,
        cpu,
        gpu,
        battery,
        colors
    } = mobiledata;

    const changeit = (e) => {
        send({...mobiledata,[e.target.name]: e.target.value});
    }
    const justSubmit = e => {
        e.preventDefault();
        document.body.scrollTop = 0;
        if (photo.length === 0 ||
            name.length === 0 ||
            network.length === 0 ||
            launch.length === 0 ||
            dimensions.length === 0 ||
            sims.length === 0 ||
            size.length === 0 ||
            display.length === 0 ||
            resolution.length === 0 ||
            os.length === 0 ||
            chipset.length === 0 ||
            frontcamera.length === 0 ||
            backcamera.length === 0 ||
            video.length === 0 ||
            storage.length === 0 ||
            cpu.length === 0 ||
            gpu.length === 0 ||
            battery.length === 0 ||
            colors.length === 0 ) {
            setAlert('Fill the Form Correctly', 'danger');
        }
        else if(photo.length < 10){
            setAlert('Invalid Photo URL','danger');
        }
        else {
            devname = name.toLowerCase();
            adddevice({
                tok,
                photo,
                devname,
                network,
                launch,
                dimensions,
                sims,
                size,
                display,
                resolution,
                os,
                chipset,
                frontcamera,
                backcamera,
                video,
                storage,
                cpu,
                gpu,
                battery,
                colors,
                username
            });
        }
    }

    return (
        <div style={{ padding: "4%", width: "60%", margin: "2% auto 0", borderRadius: "10px" }}>
            <Alert />
            <h3>Device Information</h3>
            <br />
            <form onSubmit={justSubmit}>
                <label>
                    Photo
                </label>
                <input type="text" name="photo" value={photo} style={{ width: "30%", margin: "0 5% 0 9%" }} onChange={changeit} />
                <label>
                    Name
                </label>
                <input style={{ width: "30%", margin: "0 5% 0 9%" }} name="name" value={name} type="text" onChange={changeit} />
                <br />
                <label >
                    Launch
                </label>
                <input type="text" style={{ width: "30%", margin: "0 5% 0 8%" }} name="launch" value={launch} onChange={changeit} />
                <label>
                    Dimensions
                </label>
                <input type="text" style={{ width: "30%", margin: "0 5% 0 4%" }} name="dimensions" value={dimensions} onChange={changeit} />
                <br /><br />
                <h3>Network</h3>
                <br />
                <label>
                    Technology
                </label>
                <input type="text" style={{ width: "30%", margin: "0 6% 0 4%" }} name="network" value={network} onChange={changeit} />
                <label>
                    Sims
                </label>
                <input type="text" style={{ width: "30%", margin: "0 5%" }} name="sims" value={sims} onChange={changeit} />
                <br /><br />
                <h3>Platform</h3>
                <br />
                <label>
                    Display-type
                </label>
                <input type="text" style={{ width: "30%", margin: "0 7% 0 2%" }} name="display" value={display} onChange={changeit} />
                <label>
                    Size
                </label>
                <input type="text" style={{ width: "30%", margin: "0 6%" }} name="size" value={size} onChange={changeit} />
                <label>
                    Resolution
                </label>
                <input type="text" style={{ width: "30%", margin: "0 7% 0 4%" }} name="resolution" value={resolution} onChange={changeit} />
                <label>
                    OS
                </label>
                <input type="text" style={{ width: "30%", margin: "0 7%" }} name="os" value={os} onChange={changeit} />
                <label>
                    Chipset
                </label>
                <input type="text" style={{ width: "30%", margin: "0 6.5%" }} name="chipset" value={chipset} onChange={changeit} />
                <label>
                    GPU
                </label>
                <input type="text" style={{ width: "30%", margin: "0 6.4%" }} name="gpu" value={gpu} onChange={changeit} />
                <label>
                    CPU
                </label>
                <input type="text" style={{ width: "30%", margin: "0 9.5%" }} name="cpu" value={cpu} onChange={changeit} />
                <br /><br />
                <h3>Memory</h3>
                <br />
                <label>
                    Storage
                </label>
                <input type="text" style={{ width: "30%", margin: "0 7%" }} name="storage" value={storage} onChange={changeit} />
                <label>
                    Frontcamera
                </label>
                <input type="text" style={{ width: "30%", margin: "0 2%" }} name="frontcamera" value={frontcamera} onChange={changeit} />
                <label>
                    Backcamera
                </label>
                <input type="text" style={{ width: "30%", margin: "0 7% 0 3.3%" }} name="backcamera" value={backcamera} onChange={changeit} />
                <label>
                    Video
                </label>
                <input type="text" style={{ width: "30%", marginLeft: "8%" }} name="video" value={video} onChange={changeit} />
                <label>
                    Battery
                </label>
                <input type="text" style={{ width: "30%", margin: "0 7.5%" }} name="battery" value={battery} onChange={changeit} />
                <label>
                    Colours
            </label>
                <input type="text" style={{ width: "30%", marginLeft: "6%" }} name="colors" value={colors} onChange={changeit} />
                <br /><br />
                <input type="submit" className="btn btn-danger btn-lg" value="ADD" />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    added : state.status.addit,
    failed : state.status.failer,
    username : state.auth.user.name
})

export default connect(mapStateToProps,{ adddevice , setAlert })(Add);