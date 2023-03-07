import React from 'react';
import { Box, Button, Typography  } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import DataService from '../services/GridEyeServices';

const StyledButton = styled(Button)(({ theme }) => ({
	padding: '10px',
	lineHeight: '1',
	minWidth: '75px',
	fontSize: '12px'
}));

const ModelBox = (props) => {

	const [addData, setAddData] = useState({});
	const [confirmPwd, setConfirmPwd] = useState('');
		useEffect(() => { 
			setAddData(props.data);
		}, [props.data]);

	const [passwordReq, setPasswordReq] = useState('');
	const [confirmPasswordReq, setConfirmPasswordReq] = useState('');

	const addHandler = async (e) => {
			e.preventDefault();
		let res = null 

		var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
			if(strongRegex.test(addData.pwd)) {
				setPasswordReq('');
			} else {
				setPasswordReq('Password must have at least 8 characters includes 1 uppercase, 1 lowercase, special character and a number')
			}

			if(addData.pwd === confirmPwd){
				setConfirmPasswordReq('');
			} else {
				setConfirmPasswordReq('Password and Confirm password should be same');
			}

		if (!props.isEditBox) { 
			res = await DataService.updaterPwdModelBox(addData);	
		} else {
			res = await DataService.pwdModelBox(addData);
		}

		if (res?.data.status) {
			props.modelBoxClose();
		}
	}

	return (
		<React.Fragment>
			<Box>
				<Dialog open={props.adduser} onClose={props.modelBoxClose} sx={{ '& .MuiPaper-root': { width: 500 } }}>
					<DialogTitle variant='h5'>Model Dailog Box</DialogTitle>
					<DialogContent>
						<Box className='custom-dialog' component="form" sx={{
							'& .MuiTextField-root': { my: 1, width: '100%' },
							'& .MuiOutlinedInput-root': { fontSize: 13 },
							'& .MuiInputLabel-root': { fontSize: 13 }
						}} noValidate
							autoComplete="off">
							
							{
									!props.isEditBox ?
									<>
									<TextField
										id="pwd"
										label="Password"
										type="password"
										size="small"
										
									/>
					{ (passwordReq) ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{passwordReq}</Typography> : null }
									<TextField
										id="confirmPwd"
										label="Confirm Password"
										type="password"
										size="small"
										
									/>
					{ (confirmPasswordReq) ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{confirmPasswordReq}</Typography> : null }
									</> : null
							}
						</Box>
					</DialogContent>
					<DialogActions sx={{ py: '16px', px: '24px' }}>
						<StyledButton variant="outlined" color='secondary' onClick={props.adduserClose}>Cancel</StyledButton>
						<StyledButton variant="contained" color='primary' onClick={addHandler}>Update</StyledButton>
					</DialogActions>
				</Dialog>
			</Box>
		</React.Fragment>
	)
}

export default ModelBox;