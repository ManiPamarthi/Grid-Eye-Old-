import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormControl, TextField, InputLabel, Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DataService from '../services/GridEyeServices';
import OutlinedInput from '@mui/material/OutlinedInput';

const StyledButton = styled(Button)(({ theme }) => ({
	borderColor: theme.palette.primary.main,
	// border:'1px solid',
	padding: '10px',
	lineHeight: '1',
	minWidth: '75px',
	fontSize: '12px'
}));

const Addapi = (props) => {
	const [addData, setAddData] = useState({});
	const methodData = ['POST', 'GET'];
	const formatData = ['JSON'];
	useEffect(() => {
		setAddData(props.data);
	}, [props.data]);

	const [nameError, setNameError] = useState();
	const [nameErrorMsgReq, setNameErrorMsgReq] = useState('');
	const [serverErrorMsgReq, setServerErrorMsgReq] = useState('');
	const [apiErrorMsgReq, setApiErrorMsgReq] = useState('');
	const [methodErrorMsgReq, setMethodErrorMsgReq] = useState('');
	const [formatErrorMsgReq, setFormatErrorMsg] = useState('');
	const [userggentErrorMsgReq, setUsetagentErrorMsgReq] = useState('');

	const addHandler = async (e) => {
		e.preventDefault();
		let res = null;

			if(addData.name === ''){
				setNameErrorMsgReq('Name Required');
			} else {
				setNameErrorMsgReq('');
			}
			if(addData.server_url === ''){
				setServerErrorMsgReq('Server Required');
			} else {
				setServerErrorMsgReq('');
			}
			if(addData.api_key === ''){
				setApiErrorMsgReq('Api Key Required');
			} else {
				setApiErrorMsgReq('');
			}
			if(addData.method === ''){
				setMethodErrorMsgReq('Method Required');
			} else {
				setMethodErrorMsgReq('');
			}
			if(addData.format === ''){
				setFormatErrorMsg('Format Required');
			} else {
				setFormatErrorMsg('');
			}
			if(addData.useragent === ''){
				setUsetagentErrorMsgReq('Useragent Required');
			} else {
				setUsetagentErrorMsgReq('');
			}

	if((addData.name !== '') && (addData.server_url !== '') && (addData.api_key !== '') && (addData.method !== '') && (addData.format !== '') && (addData.useragent !== '')) {
		if (props.isEditBox) {
			res = await DataService.updateApi(addData);
		} else {
			res = await DataService.addApi(addData);
		}
		//Duplicate API Validator
		if ( res?.data.status  === -1) {
			setNameErrorMsgReq('Already API Exists');
			return;
		}
		else{
			setNameErrorMsgReq('');
		}
		if (res?.data.status) {
			props.addapiClose();
		}
	}
}

	const onClose = () => {
		props.addapiClose();
		setNameErrorMsgReq('');
		setServerErrorMsgReq('');
		setApiErrorMsgReq('');
		setMethodErrorMsgReq('');
		setFormatErrorMsg('');
		setUsetagentErrorMsgReq('');
	}


	return (
		<React.Fragment>
			<Box>
				<Dialog open={props.addapi} onClose={onClose} sx={{ '& .MuiPaper-root': { width: 500 } }}>
					<DialogTitle variant='h5'>Add API</DialogTitle>
					<DialogContent>
						<Box className='custom-dialog' component="form" sx={{
							'& .MuiTextField-root': { my: 1, width: '100%' },
							'& .MuiOutlinedInput-root': { fontSize: 13 },
							'& .MuiInputLabel-root': { fontSize: 13 }
						}} noValidate
							autoComplete="off">
							{
								Object.keys(addData).map((key, index) => (
									!(key === 'format' || key === 'method') ?
							(<>
								{ (key ==='name'  && nameError)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{nameError}</Typography>: null }
										<TextField key={index}
											id={key}
											label={key.replaceAll('_', ' ')}
											type="text"
											size="small"
											value={addData[key]}
											onChange={(event) => setAddData({ ...addData, [key]: event.target.value })}
										/>
				{ (key ==='name'  && nameErrorMsgReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{nameErrorMsgReq}</Typography>: null }
				{ (key ==='server_url'  && serverErrorMsgReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{serverErrorMsgReq}</Typography>: null }
				{ (key ==='api_key'  && apiErrorMsgReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{apiErrorMsgReq}</Typography>: null }
				{ (key ==='useragent'  && userggentErrorMsgReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{userggentErrorMsgReq}</Typography>: null }
						</>)
								:	(<> <FormControl sx={{ my: 1, width: '100%' }} size="small">
											<InputLabel id={`${key}-label`}>{key.replaceAll('_', ' ')}</InputLabel>
											<Select
												labelId={`${key}-label`}
												id={key}
												label={key.replaceAll('_', ' ')}
												value={addData[key]}
												onChange={(event) => setAddData({ ...addData, [key]: event.target.value })}
												sx={{ '& .MuiMenuItem-gutters': { fontSize: '12' } }}
											>
												{
													key === 'method' ?
														methodData.map((md, index) => (
															<MenuItem key={index} value={md} sx={{ fontSize: 12 }}>{md}</MenuItem>
														)) :
														formatData.map((fd, index) => (
															<MenuItem key={index} value={fd} sx={{ fontSize: 12 }}>{fd}</MenuItem>
														))
												}
											</Select>
										</FormControl>
		{ (key ==='method'  && methodErrorMsgReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{methodErrorMsgReq}</Typography>: null }
		{ (key ==='format'  && formatErrorMsgReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{formatErrorMsgReq}</Typography>: null }
				</>)
								))
							}
						</Box>
					</DialogContent>
					<DialogActions sx={{ py: '16px', px: '24px' }}>
						<StyledButton variant="outlined" color='secondary' onClick={onClose}>Cancel</StyledButton>
						<StyledButton variant="contained" color='primary' onClick={addHandler}>{props.isEditBox ? 'Update' : 'Add'}</StyledButton>
					</DialogActions>
				</Dialog>
			</Box>
		</React.Fragment>
	)
}

export default Addapi;