import React from 'react';
import spinner from '../components/spinner.gif';

const Spinner = () => (
    <img
      src={spinner}
      style ={{width: '100px',height : '100px', display: 'block',margin:"10% auto"}}
      alt="Loading..."
    />
);

export default Spinner;