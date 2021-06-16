import React from 'react';
import { connect } from 'react-redux';

const Alert = ({ alrt }) =>
  alrt.map((alert) => (
    <div className={`alert-${alert.alertType}`}>
      <h3>{alert.msg}</h3>
    </div>
  ));

const mapStateToProps = (state) => ({
  alrt: state.alert
});

export default connect(mapStateToProps)(Alert);