import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import loading from '../images/loading.gif';

const LoadingIndicator = props => {
  return (
    <Typography textAlign={'center'} component="h2" variant="h6" color="primary" gutterBottom className="data-loading-msg">
      {/* {props.message || 'Loading..!'} */}
      <img src={loading} alt="Loading..." className ='loading-img' width='32' />
    </Typography>
  );
}

LoadingIndicator.propTypes = {
  message: PropTypes.string,
};

export default LoadingIndicator;