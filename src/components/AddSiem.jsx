import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FormControl, TextField, InputLabel, Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useEffect,  useState } from 'react';
import DataService from '../services/GridEyeServices';

const StyledButton = styled(Button)(({ theme }) => ({
	borderColor: theme.palette.primary.main,
	// border:'1px solid',
	padding: '10px',
	lineHeight: '1',
	minWidth: '75px',
	fontSize: '12px'
}));

const Addsiem = (props) => {
	
	const [addData, setAddData] = useState({});
	const [isValid, setIsValid] = useState(true);
	const [errMsg, setErrMsg] = useState('');
	useEffect(() => {
		if (!props.isEdit) {
		setAddData(props.data);
		} else {
			setAddData(props.data);
		}
	}, [props.data, props.isEdit]);
	const [nameErrorMsg, setNameErrorMsg] = useState('');
	const [serverErrorMsg, setServerErrorMsg] = useState('');
	const [protocolErrorMsg, setProtocolErrorMsg] = useState('');
	const [formatErrorMsg, setFormatErrorMsg] = useState('');
	const addHandler = async () => {
		let res = null;

		if(addData.name === ''){
			setNameErrorMsg("Name must be Required");
		} else {
			setNameErrorMsg('');
		}
		if(addData.server_url === ''){
			setServerErrorMsg('Server must be Required');
		} else {
			setServerErrorMsg('');
		}
		if(addData.protocol === ''){
			setProtocolErrorMsg('Protocol must be Required');
		} else {
			setProtocolErrorMsg('');
		}
		if(addData.format === ''){
			setFormatErrorMsg('Format must be Required');
		} else {
			setFormatErrorMsg('');
		}
		
		const port = addData.port ? +addData.port : 0;
		if (port <= 65535 && port >= 1) {
			setIsValid(true);
			setErrMsg('');
		} else if (port <= 65535) {
			setIsValid(false);
			setErrMsg('Value must be greater than or equal to 1.');
		} else if (port >= 1) {
			setIsValid(false);
			setErrMsg('Value must be less than or equal to 65535.');
		} else if (port < 1) {
			setIsValid(false);
			setErrMsg('Value must be greater than or equal to 1.');
		} else {
			setErrMsg('');
		}

		if((addData.name !== '') && (addData.server_url !== '') && (addData.format !== '') && (addData.protocol !== '') && (addData.port !== '') && (addData.port > 0) ) {
			if (props.isEdit) {
				res = await DataService.updateSiem(addData);
			} else {			
				res = await DataService.addSiem(addData);
			}
			if (res?.data.status) {
				props.addsiemClose();
			}
		} 
	}
	const onClose = () => {
		setIsValid(true);
		setErrMsg('');
		props.addsiemClose();
		setNameErrorMsg('');
		setServerErrorMsg('');
		setProtocolErrorMsg('');
		setFormatErrorMsg('');
	}
	return (
		<React.Fragment>
			<Box>
				<Dialog open={props.addsiem} onClose={onClose} sx={{ '& .MuiPaper-root': { width: 500 } }}>
					<DialogTitle variant='h5'>Add Syslog/SIEM</DialogTitle>
					<DialogContent>
						<Box className='custom-dialog' component="form" sx={{
							'& .MuiTextField-root': { my: 1, width: '100%' },
							'& .MuiOutlinedInput-root': { fontSize: 13 },
							'& .MuiInputLabel-root': { fontSize: 13 }
						}} noValidate
							autoComplete="off">
							<div>
								<TextField
									id="name"
									label="Name"
									type="text"
									size="small"
									value={addData.name}
									onChange={(event) => setAddData({ ...addData, name: event.target.value })}
								/>
				{nameErrorMsg  ? <Typography variant='h6' sx={{ color: '#fd5969', fontSize:'13px' }}>{nameErrorMsg}</Typography>: null }
								<TextField
									id="server"
									label="Server"
									type="text"
									size="small"
									value={addData.server_url}
									onChange={(event) => setAddData({ ...addData, server_url: event.target.value })}
								/>
				{serverErrorMsg  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px'}}>{serverErrorMsg}</Typography>: null }
							</div>
							<div>
								<FormControl sx={{ my: 1, width: '100%' }} size="small">
									<InputLabel id="proto-select-label">Protocol</InputLabel>
									<Select
										labelId="proto-select-label"
										id="proto-select"
										value={addData.protocol}
										label="Protocol"
										onChange={(event) => setAddData({ ...addData, protocol: event.target.value })}
										sx={{ '& .MuiMenuItem-root': { fontSize: 12 } }}
									>
										<MenuItem value={"TCP"} sx={{ fontSize: 12 }}>TCP</MenuItem>
										<MenuItem value={"UDP"} sx={{ fontSize: 12 }}>UDP</MenuItem>
									</Select>
								</FormControl>
				{protocolErrorMsg  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{protocolErrorMsg}</Typography>: null }
								<TextField
									id="port"
									name="port"
									label="Port"
									type="number"
									inputProps={{min: 1, max: 65535}}
									size="small"
									value={addData.port}
									onChange={(event) => setAddData({ ...addData, port: event.target.value })}
								/>
					{!isValid && <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{errMsg}</Typography>}
							</div>
							<div>
								<FormControl sx={{ my: 1, width: '100%' }} size="small">
									<InputLabel id="format-select-label">Format</InputLabel>
									<Select
										labelId="format-select-label"
										id="format-select"
										value={addData.format}
										label="Format"
										onChange={(event) => setAddData({ ...addData, format: event.target.value })}
										sx={{ '& .MuiMenuItem-root': { fontSize: 12 } }}
									>
										<MenuItem value={"json"} sx={{ fontSize: 12 }}>JSON</MenuItem>
										<MenuItem value={"cef"} sx={{ fontSize: 12 }}>CEF</MenuItem>
										<MenuItem value={"leef"} sx={{ fontSize: 12 }}>LEEF</MenuItem>
									</Select>
								</FormControl>
				{formatErrorMsg  ? <Typography variant='h6' sx={{ color: '#fd5969',fontSize:'13px' }}>{formatErrorMsg}</Typography>: null}
							</div>						
					<DialogActions sx={{ py: '16px', px: '24px' }}>
						<StyledButton variant="outlined" color='secondary' onClick={onClose}>Cancel</StyledButton>
						<StyledButton variant="contained" color='primary' onClick={addHandler}>{props.isEdit ? 'Update' : 'Add'}</StyledButton>
					</DialogActions>
						</Box>
					</DialogContent>
				</Dialog>
			</Box>
		</React.Fragment>
	)
}

export default Addsiem;