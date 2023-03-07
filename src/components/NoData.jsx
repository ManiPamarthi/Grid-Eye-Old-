import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

const NoDataMsg = props => {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom className="no-data-msg">
      {props.message || 'No data available'}
    </Typography>
  );
}

NoDataMsg.propTypes = {
  message: PropTypes.string,
};

export default NoDataMsg;