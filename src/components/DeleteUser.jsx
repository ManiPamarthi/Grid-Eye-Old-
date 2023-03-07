import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dialog, DialogActions, DialogContent, DialogTitle }from '@mui/material';
import DataService from '../services/GridEyeServices';

const StyledButton = styled(Button)(({theme}) => ({
    padding:'10px',
    lineHeight:'1',
    minWidth:'75px',
    fontSize:'12px'
  }));

const Deleteuser = (props) => {
	const saveHandler = async () => {
		const res = await DataService.deleterUser(props.name);
		if (res.data.status) {
			props.deleteuserClose();
		}
	}
  return (
    <React.Fragment>
    <Box>
    <Dialog open={props.deleteuser} onClose={props.deleteuserClose} sx={{'& .MuiPaper-root':{width:500}}}>
        <DialogTitle variant='h5'>Delete User</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{'& .MuiTextField-root':{my:1,width:'100%'},
          '& .MuiOutlinedInput-root':{fontSize:13},
          '& .MuiInputLabel-root':{fontSize:13}}}noValidate
      autoComplete="off">
          <div>
            <Typography variant='body2'>Are you sure to delete this user?</Typography>
        </div>
        </Box>
         
        </DialogContent>
        <DialogActions sx={{py:'16px',px:'24px'}}>
          <StyledButton variant="outlined" color='secondary' onClick={props.deleteuserClose}>Cancel</StyledButton>
          <StyledButton variant="contained" color='primary' onClick={saveHandler}>Delete</StyledButton>
        </DialogActions>
    </Dialog>
    </Box>
    </React.Fragment>
  )
}

export default Deleteuser;