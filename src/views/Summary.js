import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

function Summary({value}) {
  return (
    <div>Total Count: {value}</div>
  );
}

Summary.propTypes = {
  value: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  let sum = 0;
  for (const key in state) {
    if (state.hasOwnProperty(key)) {
      sum += state[key];
    }
  }
  return {value: sum};
}


export default connect(mapStateToProps)(Summary);


