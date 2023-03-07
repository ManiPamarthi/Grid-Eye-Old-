import React from 'react';
import { Link } from "react-router-dom";
import { Typography } from '@mui/material';

const Copyright = () => {
  return (
      <>
    <Typography variant="body2" color="secondary.main" align="center">
        {'Copyright © '}
        <Link to="">
          GRID EYE<sup>TM</sup>
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
      </>
  )
}

export default Copyright