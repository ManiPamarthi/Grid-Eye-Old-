import React from 'react';
import { Box, Stack, styled, } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Adduser from './AddUser';
import Deleteuser from './DeleteUser';
import { Link } from "react-router-dom";
import ChangePassword from '../pages/ChangePassword';
import { useState } from 'react';
import DataService from '../services/GridEyeServices';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		color: theme.palette.secondary.main,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
	},
}));

const Userbox = (props) => {

	const [userData, setUserData] = React.useState();

	// edit user
	const [edituser, setEdituser] = React.useState(false);
	const [permission, setPermission] = useState([]);
	const [role, setRole] = useState([]);
	const getpermissionData = async () => {
		const res = await DataService.getPermission();
		return res?.data ? res.data : [];
	}
	const getRolesData = async () => {
		const res = await DataService.getRoles();
		return res.data ? res.data : [];
	}
	const edituserClick = async (user) => {
		const data = await getpermissionData();
		const data1 = await getRolesData();
		setPermission(data);
		setRole(data1);
		setUserData(user);
		setEdituser(true);
	};
	const edituserClose = () => {
		setEdituser(false);
		props.closeHandler();
	};
	// delete user
	const [deleteuser, setDeleteuser] = React.useState(false);
	const deleteuserClick = (user) => {
		setUserData(user);
		setDeleteuser(true);
	};
	const deleteuserClose = () => {
		setDeleteuser(false);
		props.closeHandler();
	};
	// change password
	const [changepwd, setChangepwd] = React.useState(false);
	const [userName, setUserName] = useState('');
	const changepwdClick = (name) => {
		setChangepwd(true);
		setUserName(name);
	};
	const changepwdClose = () => {
		setChangepwd(false);
	};

	return (
		<React.Fragment>
			<Box>
				{
					userData ? <Adduser data={userData} isEditBox={true} adduser={edituser} adduserClose={edituserClose} permissions={permission} roles={role} /> : null
				}
				{
					changepwd ? <Link to="/changePassword" changepwd={changepwd} changepwdClose={changepwdClose} userName={userName} /> : null
				}
				{
					deleteuser ? <Deleteuser name={userData?.name} deleteuser={deleteuser} deleteuserClose={deleteuserClose} /> : null
				}
				<TableContainer className='table' sx={{ maxHeight: 265 }}>
					<Table stickyHeader size="small" aria-label="simple table">

						<TableHead>
							<TableRow>
								<StyledTableCell>Name</StyledTableCell>
								<StyledTableCell>Email</StyledTableCell>
								<StyledTableCell>Password</StyledTableCell>
								<StyledTableCell>Role</StyledTableCell>
								<StyledTableCell>Permissions</StyledTableCell>
								<StyledTableCell>Action</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props?.data?.map((user) => (
								<TableRow
									key={user.name}
									sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
									<StyledTableCell component="th" scope="row">
										{user.name}
									</StyledTableCell>
									<StyledTableCell>{user.email}</StyledTableCell>
									<StyledTableCell>
										<Stack direction="row" alignItems="center">**********
											<EditIcon color='secondary' onClick={() => changepwdClick(user.name)} sx={{ marginLeft: 'auto', cursor: 'pointer' }} />
										</Stack></StyledTableCell>
									<StyledTableCell>{user.role}</StyledTableCell>
									<StyledTableCell>
										<Stack direction="row" sx={{ flexWrap: 'wrap' }}>
											{user.permissions.map((item, index) => (
												<Chip key={index} label={item} size="small" sx={{ fontSize: '12px', marginRight: 1, marginBottom: 1 }} />
											))}
										</Stack>
									</StyledTableCell>
									<StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
										<EditIcon color='secondary' sx={{ marginLeft: '8px', cursor: 'pointer' }} onClick={() => edituserClick(user)} />
										<DeleteIcon color='secondary' onClick={() => deleteuserClick(user)} sx={{ marginLeft: '8px', cursor: 'pointer' }} />{user.action}
									</StyledTableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>

		</React.Fragment>
	)
}

export default Userbox;