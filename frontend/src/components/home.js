import Phoneone from './phonedetails';
import Phonetwo from './phonetwo';
import Spinner from '../components/spinner';
import { connect } from 'react-redux';
import { getallphones } from '../actions/phone';
import { useEffect } from 'react';

const Home = ({ loaded , getallphones }) => {
    useEffect(() => {
        getallphones();
    }, [getallphones]);

    if(loaded){
    return <div style={{ width: "100%", height: "86%", marginTop: "3%" }}>
        <Phoneone />
        <Phonetwo />
    </div>
    }
    else{
        return <Spinner />;
    }
}

const mapStateToProps = state => ({
    loaded : state.phone.isloading
})

export default connect(mapStateToProps, { getallphones })(Home);