import React from 'react';
import { Box, Button, Typography  } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { FormControl, TextField, InputLabel, Select, Chip } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState, useEffect } from 'react';
import DataService from '../services/GridEyeServices';
import validator from 'validator';
import Multiselect from 'multiselect-react-dropdown';

const StyledButton = styled(Button)(({ theme }) => ({
	padding: '10px',
	lineHeight: '1',
	minWidth: '75px',
	fontSize: '12px'
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, permissions, theme) {
	return {
		fontWeight:
			permissions.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}
const Adduser = (props) => {

	const [addData, setAddData] = useState({});
	const [confirmPwd, setConfirmPwd] = useState('');
	const [isMatch, setIsMatch] = useState(false);
	const [options, setOptions]= useState(['option 1','option 2', 'option 3']);
	useEffect(() => { 
		setAddData(props.data);
	}, [props.data]);
const theme = useTheme();
	const [emailError, setEmailError] = useState('');
	const [nameError, setNameError] = useState();
	const [nameErrorReq, setNameErrorReq] = useState(true);
	const [emailReq, setEmailReq] = useState(true);
	const [passwordReq, setPasswordReq] = useState('');
	const [confirmPasswordReq, setConfirmPasswordReq] = useState('');
	const [roleReq,setRoleReq] = useState('');
	const [permissionsReq,setPermissionsReq] = useState('');
	
	const addHandler = async (e) => {
			e.preventDefault();
		let res = null 
		// Form Validation
if(addData.name === ''){
	setNameErrorReq('Name Required');
} else {
	setNameErrorReq('');
}
if(addData.email === ''){
	setEmailReq('Email Required');
} else {
	setEmailReq('');
}

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
if(strongRegex.test(addData.pwd)) {
	setPasswordReq('')
} else {
	setPasswordReq('Password must have at least 8 characters includes 1 uppercase, 1 lowercase, special character and a number')
}

if(addData.pwd === confirmPwd){
	setConfirmPasswordReq('');
} else {
	setConfirmPasswordReq('Password and Confirm password should be same');
}
if(addData.role === ''){
	setRoleReq('Role Required');
} else {
	setRoleReq('');
}

if(addData.perm === ''){
	setPermissionsReq('Permissions Required');
} else {
	setPermissionsReq('');
}

if (addData.email && !validator.isEmail(addData.email)) {
	setEmailError('Please Enter a Valid Email');
	return;
} else {
	setEmailError('');
}
 
		if (props.isEditBox) { 
			res = await DataService.updateUsers(addData);
		} else {
			res = await DataService.addUser(addData);
		}
		//Duplicate Name Validator
		if ( res?.data.status  === -1) {
			setNameError('Already Exists Name');
			return;
		}
		else{
			setNameError('');
		}
		if (res?.data.status) {
			props.adduserClose();
		}
	}

	return (
		<React.Fragment>
			<Box>
				<Dialog open={props.adduser} onClose={props.adduserClose} sx={{ '& .MuiPaper-root': { width: 500 } }}>
					<DialogTitle variant='h5'>{props.isEditBox ? 'Edit User' : 'Add User'}</DialogTitle>
					<DialogContent>
						<Box className='custom-dialog' component="form" sx={{
							'& .MuiTextField-root': { my: 1, width: '100%' },
							'& .MuiOutlinedInput-root': { fontSize: 13 },
							'& .MuiInputLabel-root': { fontSize: 13 }
						}} noValidate
							autoComplete="off">
							{
								Object.keys(addData).map((key, index) => ( 
									!(key === 'permissions' || key === 'role' || key === 'pwd') ?
						(
						<> 	{ (key ==='name'  && nameError)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{nameError}</Typography>: null }
										<TextField key={index}
											id={key}
											label={key.replaceAll('_', ' ')}
											type="text"
											size="small"
											value={addData[key]}
											onChange={(event) => setAddData({ ...addData, [key]: event.target.value })} 
										/> 
						{ (key ==='name'  && nameErrorReq)  ? <Typography variant='h6' sx={{ color: '#fd5969', fontSize:'13px' }}>{nameErrorReq}</Typography>: null }
						{ (key ==='email'  && emailReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{emailReq}</Typography>: null }
						{ (key === 'email' && emailError) ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{emailError}</Typography> : null }
						</>
						)
										: (key !== 'pwd') && <FormControl sx={{ my: 1, width: '100%' }} size="small" key={index}> 
											<InputLabel id={`${key}-label`}>{key.replaceAll('_', ' ')}</InputLabel>
											<Multiselect
												key={index}
												labelId={`${key}-label`}
												id={key}
												options={options}
												multiple= {key === 'permissions'}
												value={addData[key] ? Array.isArray(addData[key]) ? addData[key] : addData[key] : []}
												onChange={(event) => {
													if (key === 'role') {
														setAddData({ ...addData, ['role']: Array.isArray(addData[key]) ? event.target.value : event.target.value.toString(), ['permissions']: props.permissions[event.target.value] });
													} else {
														setAddData({ ...addData, ['permissions']: Array.isArray(addData[key]) ? event.target.value : event.target.value });
													}
												}}	
												input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
												renderValue={(selected) => (
													<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
														{
															Array.isArray(selected) ? (
															<>
															{
																selected.map((value) => (
																	<Chip key={value} label={value} />
																))
															}
																</>
															): <Chip key={selected} label={selected} />
														}
													</Box>
												)}
												MenuProps={MenuProps}
											>
												{
													key === 'permissions' ?
													props.permissions?.list?.map((perm, index) => (
														<Multiselect
															key={index}
															value={perm}
															options={options}
															style={getStyles(perm, props.permissions?.list, theme)}
														>
															{perm}
														</Multiselect>
													))
													: 
													props.roles?.map((role, index) => (
														<Multiselect
															key={index}
															value={role}
															options={options}
															style={getStyles(role, props.roles, theme)}
														>
															{role}
														</Multiselect>
													))
												}
											</Multiselect>
				{ (key ==='role'  && roleReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{roleReq}</Typography>: null }
				{ (key ==='permissions'  && permissionsReq)  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{permissionsReq}</Typography>: null }
										</FormControl>
								))
							}
							{
									!props.isEditBox ?
									<>
									<TextField
										id="pwd"
										label="Password"
										type="password"
										size="small"
										value={addData['pwd']}
										onChange={(event) => setAddData({ ...addData, pwd: event.target.value })}
									/>
									{ (passwordReq) ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{passwordReq}</Typography> : null }
									<TextField
										id="confirmPwd"
										label="Confirm Password"
										type="password"
										size="small"
										onChange={(event) => setConfirmPwd(event.target.value)}
									/>
									{ (confirmPasswordReq) ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{confirmPasswordReq}</Typography> : null }

									</> : null
							}
						</Box>

					</DialogContent>
					<DialogActions sx={{ py: '16px', px: '24px' }}>
						<StyledButton variant="outlined" color='secondary' onClick={props.adduserClose}>Cancel</StyledButton>
						<StyledButton variant="contained" color='primary' onClick={addHandler}>{props.isEditBox ? "Update" : "Add"}</StyledButton>
					</DialogActions>
				</Dialog>
			</Box>
		</React.Fragment>
	)
}

export default Adduser;