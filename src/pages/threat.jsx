import React, { useState, useEffect } from 'react';
import { Button, Stack, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LoadingIndicator from '../components/LoadingIndicator';
import TimeAgo from 'react-timeago'
import Threatdetail from './ThreatDetails';
import Title from '../components/title';
import DataService from '../services/GridEyeServices';
import { useLocation } from 'react-router-dom';
import NoDataMsg from '../components/NoData';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.primary.main,
	maxHeight: '275px',
}));

const OutlineButton = styled(Button)(({ theme }) => ({
	padding: '5px 0 !important',
	color: '#fff',
	fontWeight: 'bold',
	lineHeight: '1',
	minWidth: '40px',
	fontSize: '10px'
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		color: theme.palette.secondary.main,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 12,
		maxWidth: 190,
		whiteSpace: "nowrap",
		overflow: "hidden",
		textOverflow: "ellipsis"
	},
}));

export default function Threat() {
	const { state } = useLocation();
	const initThreatId = state?.threatId;
	const [selectedThreat, setSelectedThreat] = useState(initThreatId);
	const [pageCount, setPageCount] = useState(0);
	const [totalResult, setTotalResult] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const handleCellClick = (row) => {
		setSelectedThreat(row.alert_id)
	};

	const [threats, setThreats] = useState([]);

	const fetchTotalThreats = async () => {
		const resTotal = await DataService.getTotalThreats();
		setTotalResult(resTotal.data);
	}
	const fetchData = async (count) => {
		const res = await DataService.getThreats(count);
		setIsLoading(!res?.data);
		setSelectedThreat(initThreatId ? initThreatId : (res.data?.length && res.data[0].alert_id));
		setThreats(res.data);
	}
	useEffect(() => {
		fetchTotalThreats();
		fetchData(pageCount);
	}, []);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const handleChangePage = async (event, newPage) => {
		setPage(newPage);
		const isNext = event?.currentTarget?.title?.includes('next');
		const count = isNext ? (pageCount + 10) : (pageCount - 10);
		setPageCount(count);
		await fetchData(count);
	};
	const handleChangeRowsPerPage = async (event) => {
		const value = parseInt(event.target.value, 10);
		setRowsPerPage(value);
		setPage(0);
	};
	return (
		<>
			<Grid container spacing={0}>
				<Grid item xs={12} mb={6.5}>
					<Item className='low-padding-box'>
						<Stack direction="row" justifyContent="space-between" alignItems="center">
							<Title>Threats</Title>
						</Stack>	
							{
							isLoading ? <LoadingIndicator /> :
							(isLoading.length ?
								<NoDataMsg /> :
								<>
									<TableContainer sx={{ maxHeight: 245 }} className='table'>
										<Table stickyHeader size="small" aria-label="simple table" >
											<TableHead>
												<TableRow sx={{ whiteSpace: 'nowrap' }}>
													<StyledTableCell>Severity</StyledTableCell>
													<StyledTableCell sx={{ width: '10%' }}>Time Stamp</StyledTableCell>
													<StyledTableCell>Alert Id</StyledTableCell>
													<StyledTableCell>Threat</StyledTableCell>
													<StyledTableCell>Source</StyledTableCell>
													<StyledTableCell>Destination</StyledTableCell>
													<StyledTableCell>Dest Port</StyledTableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{
													threats?.map((threat, index) => (
														<TableRow className='TableRowHover'
															key={index}
															selected={threat.alert_id === selectedThreat}
															sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer', whiteSpace: 'nowrap', '& td:first-child': { padding: '5px 0 !important' } }}
															onClick={() => handleCellClick(threat)}
														>
															<StyledTableCell>
																<OutlineButton className={`btn uxt-${threat.severity.toLowerCase()}`} variant="contained" color={threat.severity.toLowerCase() === 'high' ? 'danger' : threat.severity.toLowerCase() === 'medium' ? 'warning' : 'warning'}>{threat.severity}</OutlineButton>
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
									</TableContainer>
									<TablePagination
										component="div"
										count={totalResult}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={handleChangePage}
										rowsPerPageOptions={''}
										onRowsPerPageChange={handleChangeRowsPerPage}
									/>
								</>
						)}
					</Item>
				</Grid>
			</Grid>
			<Threatdetail alert_id={selectedThreat} />
		</>
	);

}