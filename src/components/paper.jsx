import React from 'react';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    margin:theme.spacing(3)
  }));

const BoxShadow  = props =>  {
  return (
    <Item> {props.children}</Item>
  )
}

BoxShadow.propTypes = {
    children: PropTypes.node,
  };

export default BoxShadow;