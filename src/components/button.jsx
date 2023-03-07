import React from 'react';
import PropTypes from 'prop-types';
import { Button, styled } from '@mui/material';

const StyledButton = styled(Button)(({theme}) => ({
    padding:'10px',
    lineHeight:'1',
    minWidth:'75px',
    fontSize:'12px'
  }));

const ContainedButton = (props) => {
  return (
    <div>
        <StyledButton variant="contained" type={props?.type === 'submit' ? 'submit' : 'button'} color='primary' fullWidth>
        {props.children}
        </StyledButton>
    </div>
  )
}
ContainedButton.propTypes = { children: PropTypes.node,}

export default ContainedButton;


export const OutlinedButton = props => {
  return (
    <div>
        <StyledButton>
        {props.children}
        </StyledButton>
    </div>
  )
}
OutlinedButton.propTypes = { children: PropTypes.node,}
