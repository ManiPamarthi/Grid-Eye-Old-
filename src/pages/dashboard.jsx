import React from 'react';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Traffic from './traffic';
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago'
import dataService from '../services/GridEyeServices';
import Map from '../components/map';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMsg from '../components/NoData';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.primary.main,
	maxHeight: '300px',
	minHeight: '115px',
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		color: theme.palette.secondary.main,
		fontSize: 14
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 13,
		maxWidth: 190,
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
}));

const OutlineButton = styled(Button)(({ theme }) => ({
	padding: '5px 0 !important',
	color: '#fff',
	fontWeight: 'bold',
	lineHeight: '1',
	minWidth: '40px',
	fontSize: '10px'
}));

export default function Dashboard() {
	const defaultLocation = [{
		'latitude': '47.116386',
		'longitude': '-101.299591'
	}];
	const [communicationsLoading, setCommunicationsLoading] = useState(true);
	const [communications, setCommunications] = useState([]);
	const [threatsLoading, setThreatsLoading] = useState(true);
	const [threats, setThreats] = useState([]);
	const [location, setLocation] = useState([]);
	const navigate = useNavigate();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [totalResult, setTotalResult] = React.useState(11);
	useEffect(() => {
		const fetchData = async () => {
			const res = await dataService.getCommunications(0);
			setCommunications(res?.data);
			setCommunicationsLoading(false);
			const resThreats = await dataService.getRecentThreats();
			setThreats(resThreats.data);
			setThreatsLoading(false);
			const resLoc = await dataService.getLocation();
			setLocation(resLoc.data);
		}
		fetchData();
	}, []);
			// Handler for threats page navigation with selected threat id
	const navigateToThreats = (threatId) => {
		navigate('/threats', {
			state: {
				'threatId': threatId
			}
		});
	};

	const handleChangePage = async (event, newPage) => {
		console.log(event);
		setPage(newPage);
		const res = await dataService.getCommunications(newPage);
		setTotalResult((res?.data ? res?.data.length : 0) + totalResult);
		setCommunications(res?.data);
	};
	const handleChangeRowsPerPage = async (event) => {
		const value = parseInt(event.target.value, 10);
		setRowsPerPage(value);
		setPage(0);
	};

	return (
		<Box>
			<Traffic />
			<Grid container spacing={2} mt={0}>
				<Grid item xs={12} md={6} mb={3}>

					<Item className="padding-top-5">
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Typography variant='h6' p={0} color='text'>Devices</Typography>
							{!location.length ? '' :
								<Stack direction="row" alignItems="center">
									<Link to="/device">
										<Typography variant='span'>Connected Devices</Typography>
									</Link>
									<ArrowRightIcon />
								</Stack>
							}
						</Stack>
						<Box sx={{ position: 'relative' }}>
							{/* {location.length > 0 && <Map location={location} zoomLevel={4}></Map>} */}
							{!location.length ?
								<Map location={defaultLocation} zoomLevel={3}></Map> :
								<Map location={location} zoomLevel={4}></Map>
							}
						</Box>
					</Item>
				</Grid>
				<Grid item xs={12} md={6} mb={3}>
					<Item className="communications-container padding-top-5">
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Typography variant='h6' p={0} color='text'>Communications</Typography>
							{
							!communicationsLoading ?
								<Stack direction="row" justifyContent="end" alignItems="center">
									<TablePagination
										component="div"
										count={totalResult}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										rowsPerPageOptions={''}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</Stack>
								: null
						}
						</Stack>
						<Stack direction="row" sx={{ height: 240, justifyContent: 'center', alignItems: 'center' }} >
							{communicationsLoading ?
								<LoadingIndicator /> :
								(!communications.length ?
									<NoDataMsg /> :
									<>
										<TableContainer sx={{ maxHeight: 246 }} className='table sample'>
											<Table stickyHeader size="small" aria-label="simple table">
												<TableHead>
													<TableRow>
														<StyledTableCell>Source</StyledTableCell>
														<StyledTableCell>Destination</StyledTableCell>
														<StyledTableCell>Dest Port</StyledTableCell>
														{/* <StyledTableCell align="center">Int</StyledTableCell> */}
													</TableRow>
												</TableHead>
												<TableBody>
													{communications?.map((communication) => (
														<TableRow
															key={communication.name}
															sx={{ '&:last-child td, &:last-child th': { border: 0 }, '& td:first-child': { padding: '5px 0 !important' } }}
														>
															<StyledTableCell>{communication.source}</StyledTableCell>
															<StyledTableCell>{communication.dest}</StyledTableCell>
															<StyledTableCell>{communication.dport}</StyledTableCell>
															{/* <StyledTableCell align="center">{communication.int}</StyledTableCell> */}
														</TableRow>
													))}
												</TableBody>
											</Table>
										</TableContainer>
									</>
								)}
						</Stack>
					</Item>
				</Grid>
			</Grid>
			<Grid container spacing={0}>
				<Grid item xs={12} mb={3}>
					<Item className="padding-top-5">
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Typography variant='h6' p={0} color='text'>Recent Threats</Typography>
							{!threats.length ? '' :
								<Stack direction="row" alignItems="center">
									<Link to="/threats">
										<Typography variant='span'>More</Typography>
									</Link>
									<ArrowRightIcon />
								</Stack>
							}
						</Stack>
						<TableContainer sx={{ maxHeight: 220 }} className='table samplebtn'>
							{threatsLoading ?
								<LoadingIndicator /> :
								(!threats.length ?
									<NoDataMsg /> :
									<Table stickyHeader size="small" aria-label="simple table">
										<TableHead>
											<TableRow sx={{ whiteSpace: 'nowrap' }}>
												<StyledTableCell>Severity</StyledTableCell>
												<StyledTableCell sx={{ width: '10%' }}>Time Stamp</StyledTableCell>
												<StyledTableCell>Alert Id</StyledTableCell>
												<StyledTableCell>Signature</StyledTableCell>
												<StyledTableCell>Source</StyledTableCell>
												<StyledTableCell>Destination</StyledTableCell>
												<StyledTableCell>Dest Port</StyledTableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{threats.map((threat) => (
												<TableRow className='TableRowHover'
													key={threat.name}
													sx={{ '&:last-child td, &:last-child th': { border: 0 }, whiteSpace: 'nowrap', '& td:first-child': { padding: '5px 0 !important' } }}
													onClick={() => navigateToThreats(threat.alert_id)}
												>
													<StyledTableCell>
														<OutlineButton variant="contained" color={threat?.severity?.toString().toLowerCase() === 'high' ? 'danger' : threat?.severity?.toString().toLowerCase() === 'medium' ? 'warning' : 'warning'}>{threat?.severity}</OutlineButton>
													</StyledTableCell>
													<StyledTableCell>
														<TimeAgo date={new Date(threat.timestamp)} formatter={(value, unit, suffix) => {
															return value < 1 && unit === "second" ? 'just now' : value + " " + unit + (value > 1 ? "s" : "") + " " + suffix;
														}} />
													</StyledTableCell>
													<StyledTableCell>{threat.alert_id}</StyledTableCell>
													<StyledTableCell title={threat.signature}>{threat.signature}</StyledTableCell>
													<StyledTableCell>{threat.src_ip}</StyledTableCell>
													<StyledTableCell>{threat.dest_ip}</StyledTableCell>
													<StyledTableCell>{threat.dest_port}</StyledTableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								)}
						</TableContainer>
					</Item>
				</Grid>
			</Grid>
		</Box>
	);
}