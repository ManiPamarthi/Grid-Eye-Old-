import React, { useState, useEffect } from 'react';
import {Button, Stack, Typography,Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import Userbox from '../components/UserBox';
import DataService from '../services/GridEyeServices';
import Adduser from '../components/AddUser';
import UserModelBox from '../components/UserModelBox';
import NoDataMsg from '../components/NoData';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.primary.main,
    maxHeight:'540px',
}));

const StyledButton = styled(Button)(() => ({
	padding:'10px',
	lineHeight:'1',
	minWidth:'75px',
	fontSize:'12px'
}));

const Users = () => {
	const [users, setUsers] = useState([]);
	const [userData, setUserData] = useState({});
	const fetchData = async () => {
		const res = await DataService.getUsers();
			setUsers(res.data);
	};
	const [permission, setPermission] = useState([]);
	const [role, setRole] = useState([]);
		const getpermissionData = async () => {
		const res = await DataService.getPermission();
		return res?.data ? res.data : [];
	};
	const getRolesData = async () => {
		const res = await DataService.getRoles();
		return res.data ? res.data : [];
	};
	useEffect(() => {
		fetchData();
	}, []);

	const getDefaultData = (item) => {
		const newObj = Object.keys(item).reduce((accumulator, key) => {
			return { ...accumulator, [key]: key === 'permissions' ? [] : '' };
		}, {});
		return newObj;
	};
	const [isAddUser, setIsAddUser] = useState(false);
	const [box, setBox] = useState(false);
		const adduserClick = async () => {
			const data = await getpermissionData();
			const data1 = await getRolesData();
			setPermission(data);
			setRole(data1);
			setIsAddUser(true);
			setUserData(getDefaultData(users && users[0]));	
		};
		const addUserClose = async () => {
			await fetchData();
			setIsAddUser(false);
		};

		const addBoxClick = async () => {
			setBox(true);
		}
		const addBoxClose = async () => {
			await fetchData();
			setBox(false);
		};

  	return (
    <React.Fragment>
        <Stack direction="row" justifyContent="space-between" alignItems="center" pb={2}>
        <Typography variant='h5'>Users</Typography>
		<SettingsIcon onClick={addBoxClick} sx={{cursor:'pointer',color:'#8a8c94', paddingLeft:'77%', position:'fixed' }} />
			{
				box ? <UserModelBox adduser={box} adduserClose={addBoxClose} /> : null
			}
        <StyledButton variant="contained" onClick={adduserClick}>Add</StyledButton>
        </Stack>
			{
				isAddUser ? <Adduser isEditBox={false} data={userData} adduser={isAddUser} adduserClose={addUserClose} permissions={permission} roles={role} /> : null
			}
        <Grid container spacing={0}>
        <Grid item xs={12} mb={3}>
        <Item>
			{
				users?.length > 0 ? <Userbox data={users} closeHandler={addUserClose}/> : <NoDataMsg />
			}
      </Item>
        </Grid>
      </Grid>
      
    </React.Fragment>
  	)
}

export default Users;