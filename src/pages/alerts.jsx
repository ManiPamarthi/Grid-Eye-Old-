import React from 'react';
import { Paper, Button, Stack, Grid, Typography } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import Siem from '../components/SiemBox';
import Api from '../components/ApiBox';
import Addsiem from '../components/AddSiem';
import Addapi from '../components/AddApi';
import { useState, useEffect } from 'react';
import DataService from '../services/GridEyeServices';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.primary.main,
	maxHeight: '275px',
}));

const StyledButton = styled(Button)(({ theme }) => ({
	borderColor: theme.palette.primary.main,
	padding: '10px',
	lineHeight: '1',
	minWidth: '75px',
	fontSize: '12px'
}));

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'left',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: '2px',
		minWidth: 140,
		color:
			theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '12px 0',
		},
		'& .MuiMenuItem-root': {
			fontSize: '14.4px',
			'& .MuiSvgIcon-root': {
				fontSize: 14.4,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity,
				),
			},
		},
	},
}));

const Alerts = () => {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const emptyObject = (item) => {
		const newObj = Object.keys(item).reduce((accumulator, key) => {
			return { ...accumulator, [key]: '' };
		}, {});
		return newObj;
	}
	// Add siem
	const [addsiem, setAddsiem] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [popupItem, setPopupItem] = useState({});

	const [alertSiem, setAlertSiem] = useState([]);
	const [alertEmail, setAlertEmail] = useState([]);
	const [alertApi, setAlertApi] = useState([]);

	const addsiemClick = () => {
		const newObj = {
			name: '',
			server_url: '',
			protocol: '',
			port: '',
			format: ''
		}
		setPopupItem(alertSiem[0] ? emptyObject(alertSiem[0]) : newObj);
		setIsEdit(false);
		setAddsiem(true);
		setAnchorEl(null);
	};
	const addsiemClose = () => {
		fetchData();
		setAddsiem(false);
	};
			// Add email 
	const [addemail, setAddemail] = React.useState(false);
	const addemailClick = () => {
		setPopupItem(emptyObject(alertEmail[0]));
		setIsEdit(false);
		setAddemail(true);
		setAnchorEl(null);
	};
	const addemailClose = () => {
		fetchData();
		setAddemail(false);
	};
			// Add api 
	const [addapi, setAddapi] = React.useState(false);
	const addapiClick = () => {
		setPopupItem(emptyObject(alertApi[0]));
		setIsEdit(false);
		setAddapi(true);
		setAnchorEl(null);
	};
	const addapiClose = async () => {
		await fetchData();
		setAddapi(false);
	};
		const fetchData = async () => {
			const resSiem = await DataService.getSiem();
			if (resSiem.data) {
				setAlertSiem(resSiem.data);
			}
			const resEmail = await DataService.getEmail();
			if (resEmail.data) {
				setAlertEmail(resEmail.data);
			}
			const resApi = await DataService.getApi();
			if (resApi.data) {
				setAlertApi(resApi.data);
			}
		}
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<Stack direction="row" justifyContent="space-between" alignItems="center" pb={2}>
				<Typography variant='h5'>Alerts Forwarding</Typography>
				<StyledButton variant="contained"
					id="basic-button"
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>Add</StyledButton>
				<StyledMenu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button',
					}}
				>
					<MenuItem onClick={addsiemClick}>Syslog/SIEM</MenuItem>
					{/* <MenuItem onClick={addemailClick}>Email</MenuItem> */}
					<MenuItem onClick={addapiClick}>API</MenuItem>
				</StyledMenu>
			</Stack>
			<Grid container spacing={0}>
				<Grid item xs={12} mb={3}>
					<Item>
						<Siem data={alertSiem} closeHandler={addsiemClose} />
						{
							alertSiem?.length > 0 || addsiem ? <Addsiem data={popupItem} isEdit={isEdit} addsiem={addsiem} addsiemClose={addsiemClose} /> : null
						}
					</Item>
				</Grid>
				{/* <Grid item xs={12} mb={3}>
					<Item>
						<Email data={alertEmail} closeHandler={addemailClose} />
						{
							alertEmail?.length > 0 ? <Addemail data={popupItem} isEdit={isEdit} addemail={addemail} addemailClose={addemailClose} /> : null
						}
					</Item>
				</Grid> */}
				<Grid item xs={12} mb={3}>
					<Item>
						<Api data={alertApi} closeHandler={addapiClose} />
						{
							alertApi.length > 0 ? <Addapi data={popupItem} isEdit={isEdit} addapi={addapi} addapiClose={addapiClose} /> : null
						}
					</Item>
				</Grid>
			</Grid>
		</div>
	)
}

export default Alerts;