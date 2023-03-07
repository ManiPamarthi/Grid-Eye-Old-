import React from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Dialog, DialogContent, DialogActions, DialogTitle, Typography, Stack }from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useState } from 'react';
import DataService from '../services/GridEyeServices';
import { CopyToClipboard } from "react-copy-to-clipboard";

const StyledButton = styled(Button)(({theme}) => ({
    borderColor:theme.palette.primary.main,
    // border:'1px solid',
    padding:'10px',
    lineHeight:'1',
    minWidth:'75px',
    fontSize:'12px'
  }));

const Addsensor = (props) => { 
	const [value, setValue] = useState('');
  const [copyText, setCopyText] = useState('');
  const onCopyText = () => {
    setCopyText(true);
    setTimeout(() => {
      setCopyText(false);
    }, 1200);
  };

	const inputChange = (event) => {
		setValue(event.target.value.replace(/[^a-z]/gi, ''));
	}
  const [sensorData, setSensorData] = useState({});
  const [keyNameError, setKeyNameError] = useState();
  const [nameError, setNameError] = useState();

	const generateHandler = async (e) => {
          e.preventDefault();
    if(value === ''){
      setNameError('Name must be Required');
      return;
    } else {
      setNameError('');
    }

		const res = await DataService.addSensor({name: value});
          //Key Name Validator
		if ( res?.data.status  === -1) {
			setKeyNameError('Already Exists Name');
			return;
		}
		else{
			setKeyNameError('');
		}
		setSensorData(res.data);
		props.setIsGenerated(true);
    props.setRefetchSensors(true);
	}

  const onClose = () => {
		props.addsensorClose();
    setValue();
    setNameError();
	}
  
  return (
   <React.Fragment>
    <Box>
    
    <Dialog open={props.addsensor} onClose={props.addsensorClose} sx={{'& .MuiPaper-root':{width:500}}}>
        <DialogTitle variant='h5'>Add</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{textAlign:'center','& .MuiTextField-root':{my:1,mb:2,width:'100%'},
          '& .MuiOutlinedInput-root':{fontSize:13},
          '& .MuiInputLabel-root':{fontSize:13}}}noValidate
      autoComplete="off">
          <div>
          { keyNameError ? <Typography variant='h6' sx={{ color: '#fd5969' }}>{keyNameError}</Typography>: null }
          <TextField
              id="outlined-required"
              label="Enter Name"
              type="text"
              size="small"
              value={value}
              onChange={(event) => inputChange(event)}
            />
    {nameError ? <Typography variant='h6' sx={{paddingRight:'67%',fontSize:'13px',color: '#fd5969' }}>{nameError}</Typography>: null } 
    {!props.isGenerated ? <StyledButton variant='contained' color="primary" onClick={generateHandler}>Generate Key</StyledButton> : null}
		{props.isGenerated ?
			<Box sx={{ marginTop: 2 }}>
				<Typography variant='subtitle2' color='secondary' sx={{ display: 'block' }}>Grid Eye Edge</Typography>{(copyText) ? <small className='CopyTextStyle'>{copyText}</small> : null}
				<Stack direction='row' justifyContent='center' alignItems='center' sx={{ mt: 2 }}>
					<Typography variant='body2' sx={{ display: 'inline-block', fontSize: '17.4px', backgroundColor: '#e3e6f0', px: '16px' }}>{sensorData.key}</Typography>
	<CopyToClipboard onCopy={onCopyText}><ContentCopyIcon color='primary' sx={{ paddingRight:'7%', cursor: 'pointer' }} onClick={() => {navigator.clipboard.writeText(sensorData.key).then(() => {setCopyText('Copied.');},() => {setCopyText('');});}} /></CopyToClipboard> 
				</Stack>
			</Box>
			: null
		}
        </div>
        </Box>
         
        </DialogContent>
          <DialogActions sx={{ py: '16px', px: '24px' }}>
						<StyledButton variant="outlined" color='secondary' onClick={onClose}>Close</StyledButton>
					</DialogActions>
        </Dialog>
    </Box>
   </React.Fragment>
  )
}

export default Addsensor;