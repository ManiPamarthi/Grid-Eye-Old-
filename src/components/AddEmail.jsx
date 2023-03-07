import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle }from '@mui/material';
import { useEffect, useState } from 'react';
import DataService from '../services/GridEyeServices';

const StyledButton = styled(Button)(({theme}) => ({
    borderColor:theme.palette.primary.main,
    // border:'1px solid',
    padding:'10px',
    lineHeight:'1',
    minWidth:'75px',
    fontSize:'12px'
  }));

const Addemail = (props) => {
    const [addData, setAddData] = useState({});
      useEffect(() => {
        if (!props.isEdit) {
        setAddData(props.data);
        } else {
          setAddData(props.data);
        }
      }, [props.data, props.isEdit]);

const addHandler = async () => {
	let res = null;
	if (props.isEdit) {
		res = await DataService.updateEmail(addData);
	} else {			
		res = await DataService.addEmail(addData);
	}
	if (res?.data.status) {
		props.addemailClose();
	}
}
  return (
    <React.Fragment>
    <Box>
    <Dialog open={props.addemail} onClose={props.addemailClose} sx={{'& .MuiPaper-root':{width:500}}}>
        <DialogTitle variant='h5'>Add Email</DialogTitle>
        <DialogContent>
          <Box className='custom-dialog' component="form" sx={{'& .MuiTextField-root':{my:1,width:'100%'},
          '& .MuiOutlinedInput-root':{fontSize:13},
          '& .MuiInputLabel-root':{fontSize:13}}}noValidate
      autoComplete="off">
		{
			Object.keys(addData).map((item, key) => (
				<TextField
          id={`outlined-required_${key}`}
          label={item.replaceAll('_', ' ')}
          defaultValue=""
          type={item === 'to' || item === 'from' ? 'email' : 'text'}
          size="small"
          value={addData[item]}
		  onChange={(event) => setAddData({ ...addData, [item]: event.target.value })}
        />
			))
		}
        </Box>
        </DialogContent>
        <DialogActions sx={{py:'16px',px:'24px'}}>
          <StyledButton variant="outlined" color='secondary' onClick={props.addemailClose}>Cancel</StyledButton>
          <StyledButton variant="contained" color='primary' onClick={addHandler}>{props.isEdit ? 'Update' : 'Add'}</StyledButton>
        </DialogActions>
      </Dialog> 
    </Box>
    </React.Fragment>
  )
}

export default Addemail;