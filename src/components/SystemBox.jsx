import React from 'react';
import { Box, Stack,Button, styled } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

const StyledButton = styled(Button)(({theme}) => ({
    color:theme.palette.danger.main,
    borderColor:theme.palette.danger.main,
    border:'1px solid',
    padding:'8px',
    lineHeight:'1',
    minWidth:'75px',
    fontSize:'12px',
    textTransform:'capitalize'
  }));

const Systembox = () => {

  return (
    <React.Fragment>
    <Box>
    <Stack direction="column" justifyContent="space-between" sx={{gap:'8px'}}>
        <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Download and install updates automatically"
        sx={{
    '& .MuiSvgIcon-root': {
      fontSize: 22,
    },
    '& .MuiFormControlLabel-label':{
        fontSize:12,
    }
  }} />
        <FormControlLabel value="male" control={<Radio />} label="Do not install update automatically" sx={{
    '& .MuiSvgIcon-root': {
      fontSize: 22,
    },
    '& .MuiFormControlLabel-label':{
        fontSize:12,
    }
  }} />
      </RadioGroup>
    </FormControl>
        <FormGroup>

      <FormControlLabel control={<Checkbox defaultChecked />} sx={{ '& .MuiSvgIcon-root': { fontSize: 22 },'& .MuiFormControlLabel-label':{fontSize:12,} }} label="Be a part of Utiltyx Secure Networks" />
    </FormGroup>
        <Box>
        <StyledButton variant="outlined" color='danger'>Restart Grid Eye</StyledButton>
        </Box>
        </Stack>
    </Box>
    </React.Fragment>
  )
}

export default Systembox;