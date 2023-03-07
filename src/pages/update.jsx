import React, { useState, useEffect } from 'react';
import { Box, Button, Stack, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ReactJson from 'react-json-view';
import DataService from '../services/GridEyeServices';
import moment from "moment";

const Uploadfile = styled(Stack)(({ theme }) => ({
	height: '100px',
	maxWidth: '42%',
	margin: 'auto',
	border: '1px dotted',
	borderColor: theme.palette.secondary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
	padding: '10px',
	lineHeight: '1',
	minWidth: '75px',
	fontSize: '12px',
	textTransform: 'capitalize',
}));

const Update = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [response, setResponse] = useState({});
	const [value, setValue] = React.useState(new Date());
	const [statusMsg, setStatusMsg] = useState(null);
	const [fileName, setFileName] = useState(null);
	const [scheduleInfo, setScheduleInfo] = useState();
	const changeHandler = async (event) => {
		const files = event.target.files;
		setFileName(files[0].name);
		const formData = new FormData();
		formData.append("file", files[0]);
		const res = await DataService.updateUploader(formData);
		setResponse(res?.data);
		setStatusMsg(res?.data?.status?.toString());
	}
	const handleChange = (event) => {
		setIsChecked(event.target.checked);
	};
	const clickHandler = async () => {
		const itemData = { schedule: +isChecked, datetime: moment(value).format("DD/MM/YYYY h:mm:ss"), fuid: response.fuid };
		await DataService.updateSchedule(itemData);
	}
	const fetchData = async () => {
		const res = await DataService.getScheduleInfo();
		setScheduleInfo(res?.data);
	}
	useEffect(() => {
		fetchData();
	}, []);

	const onKeyDown = (e) => {
		e.preventDefault();
	 };

	return (
		<React.Fragment>
			<Stack direction="row" justifyContent="space-between" alignItems="center" pb={2}>
				<Typography variant='h5'>Update</Typography>
			</Stack>
			<Uploadfile justifyContent="space-around" alignItems="center" sx={{ position: 'relative' }}>
				<CloudUploadIcon sx={{ fontSize: '4rem' }} />
				<Typography variant='body2'>Drag and Drop the update file</Typography>
				<input type='file' className='fileupload' onChange={changeHandler} style={{ opacity: 0, position: 'absolute', width: '100%', height: '100%', cursor: 'pointer' }} />
			</Uploadfile>
			<Box textAlign={'center'} sx={{ fontSize: '12px', padding: '10px' }}>
				{fileName ? <Box><p>{fileName}</p></Box> : null}
				{statusMsg ? <Box color={+statusMsg ? '#198754f2' : '#dc3848fa'}><p>{+statusMsg ? 'File uploaded successfully' : 'File failed to upload'}</p></Box> : null}
			</Box>
			<Stack alignItems="center" direction="row" justifyContent={'center'}>
				<FormControlLabel control={<Checkbox onClick={handleChange} />} sx={{ my: 4, '& .MuiSvgIcon-root': { fontSize: 22 }, '& .MuiFormControlLabel-label': { fontSize: 12, } }} label="Schedule the update to Grid Eye edge" />
				<Box sx={{ ml: 3, '& .MuiInputLabel-root': { fontSize: '12px' }, '& .MuiOutlinedInput-input': { fontSize: '12px', padding: '8px 10px' } }}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateTimePicker
							renderInput={(props) => <TextField onKeyDown={onKeyDown} {...props} />}
							label="DateTimeSelect"
							size="small"
							minDateTime={moment().toDate()}
							value={value}
							onChange={(newValue) => {
								setValue(newValue);
							}}
						/>
					</LocalizationProvider></Box>
			</Stack>
			<Box textAlign={'center'}>
				<StyledButton variant="outlined" onClick={clickHandler} color='primary'>{isChecked ? 'Update Later' : 'Update Now'}</StyledButton>
			</Box>
			<Box textAlign={'left'} paddingLeft="27%">
				{
					scheduleInfo ?
						<Grid container spacing={0} sx={{ padding: '15px 0 10px' }}>
							<Grid item xs={12} md={9}>
								<Box display="grid">
									<Box gridRow="span 6">
										<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize' }}>Scheduled for update:</Typography>
										<Typography variant='body2' sx={{ display: 'inline-block' }}>&nbsp; {scheduleInfo['scheduled for update']}</Typography>
									</Box>
									<Box gridRow="span 6">
									<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize' }}>Last updated:</Typography>
										<Typography variant='body2' sx={{ display: 'inline-block' }}>&nbsp; {scheduleInfo['last updated']}</Typography>
									</Box>
									<Box gridRow="span 6">
									<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize' }}>last update status:</Typography>
										<Box gridRow="span 6" paddingLeft="5%">
											<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize' }}>Completed:</Typography>
											<Typography variant='body2' sx={{ display: 'inline-block' }}>&nbsp; {`${scheduleInfo['last update status'].Completed.e} Edge (${scheduleInfo['last update status'].Completed.p})`}</Typography>
										</Box>
										<Box gridRow="span 6" paddingLeft="5%">
										<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize' }}>Pending:</Typography>
											<Typography variant='body2' sx={{ display: 'inline-block' }}>&nbsp; {`${scheduleInfo['last update status'].pending.e} Edge (${scheduleInfo['last update status'].pending.p})`}</Typography>
										</Box>
										<Box gridRow="span 6" paddingLeft="5%">
										<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize' }}>Failed:</Typography>
											<Typography variant='body2' sx={{ display: 'inline-block' }}>&nbsp; {`${scheduleInfo['last update status'].failed.e} Edge (${scheduleInfo['last update status'].failed.p})`}</Typography>
										</Box>
									</Box>
								</Box>
							</Grid>
						</Grid> : null
				}
			</Box>
		</React.Fragment>
	)
}

export default Update;