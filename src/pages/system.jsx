import React, { useState, useEffect } from 'react';
import { Box, Stack, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import dataService from '../services/GridEyeServices';
import NoDataMsg from '../components/NoData';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.primary.main,
	maxHeight: '275px',
}));

const System = () => {
	const [sysSetting, setSysSetting] = useState({ "secure-net": 0 });
	const [version, setVersion] = useState('');
	const fetchData = async () => {
		const resVersion = await dataService.getVersion();
		setVersion(resVersion?.data);
		const res = await dataService.getSysSetting();
		setSysSetting(res.data);
	}
	useEffect(() => {
		fetchData();
	}, []);
	const handleChange = async (event) => {
		const updatedData = { ...sysSetting, ["secure-net"]: +(event.target.checked) };
		setSysSetting(updatedData);
		const update = await dataService.updateSysSetting(updatedData);
	};
	return (
		<React.Fragment>
			<Box>
				<Stack direction="row" justifyContent="space-between" alignItems="center" pb={2}>
					<Typography variant='h5'>System</Typography>
				</Stack>
				<Grid container spacing={0}>
					<Grid item xs={12} mb={3}>
						<Item sx={{ textAlign: 'left' }}>
							<Stack direction="column" justifyContent="space-between" sx={{ gap: '8px' }}>
								<FormGroup>
								{
							(handleChange.length ?
									<FormControlLabel control={<Checkbox onChange={handleChange} checked={Boolean(sysSetting['secure-net'])} />} sx={{ '& .MuiSvgIcon-root': { fontSize: 22 }, '& .MuiFormControlLabel-label': { fontSize: 12, } }} label="Be a part of Utiltyx Secure Networks" /> 
									: <NoDataMsg /> 
						)}
								</FormGroup>
							</Stack>
							{
							version && <Box sx={{ textAlign: 'center' }}>Version: {version}</Box>
							}
						</Item>
					</Grid>
				</Grid>
			</Box>
		</React.Fragment>
	)
}

export default System;