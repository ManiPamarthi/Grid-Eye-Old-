import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
import ReactJson from 'react-json-view';
import GppGoodIcon from '@mui/icons-material/GppGood';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import LoadingIndicator from '../components/LoadingIndicator';
import DataService from '../services/GridEyeServices';
import NoDataMsg from '../components/NoData';

const Threatdetail = ({ alert_id }) => {
	const Item = styled(Paper)(({ theme }) => ({
		backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
		...theme.typography.body2,
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.primary.main,
		minHeight: '360px',
		overflow: 'scroll'
	}));

	const OutlineButton = styled(Button)(({ theme }) => ({
		padding: '5px',
		lineHeight: '1',
		minWidth: '75px',
		fontSize: '10px'
	}));

	const StyledTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.primary.main,
			color: '#fff',
			fontSize: 11,
		},
	}));

	const [threats, setThreats] = useState();
	const [isMarkSafe, setIsMarkSafe] = useState(true);
	const [isreportFb, setIsReportFb] = useState(true);
	const [isLoading, setIsLoading] = useState(true);
	const [dnp, setDnp] = useState('');
	const fetchData = async (id) => {
		const res = await DataService.getThreatDescription(id);
		setThreats(res.data);
		setIsLoading(!res?.data);
		setIsMarkSafe(res.data?.marked_safe);
		setIsReportFb(res.data?.marked_false_positive);
	}
	const iconHandler = async (icon) => {
		if (icon === 'mark') {
			setIsMarkSafe(!isMarkSafe);
			await DataService.getMarkSafe(alert_id);
		} else {
			setIsReportFb(!isreportFb);
			await DataService.getReportFb(alert_id);
		}
	}
	useEffect(() => {
		fetchData(alert_id);
	}, [alert_id]);

	/* if (JSON['app_proto']=='DNP3') {
		setDnp('DNP3 Source');
	}else {
		setDnp('DNP3 Destination');
	}*/

	return (
		<div>
			<Box>
				<Grid container spacing={0}>
					<Grid item xs={12} mb={3}>
						{isLoading ? <LoadingIndicator /> :
						(isLoading.length ?
							<NoDataMsg /> :
							<>
							<Item className='TableScrollDetails low-padding-box'>
								<Stack mb={2} direction="row" justifyContent="space-between" alignItems="center">
									<Typography variant='h6' p={0} color='text'>Threat Details</Typography>
									<Stack stickyHeader direction="row" alignItems="center" sx={{ columnGap: '16px' }}>
										<StyledTooltip title="Mark Safe" placement="top">
											<GppGoodIcon sx={{ color: isMarkSafe ? 'initial' : '#8a8c94', cursor: 'pointer' }} onClick={() => { iconHandler('mark') }} />
										</StyledTooltip>
										<StyledTooltip title="Report False Positive" placement="top">
											<EmojiFlagsIcon sx={{ color: isreportFb ? 'initial' : '#8a8c94', cursor: 'pointer' }} onClick={() => { iconHandler('report') }} />
										</StyledTooltip>
									</Stack>
								</Stack>
								<Grid container spacing={2} >
									{
										threats && Object.keys(threats)?.map((key, index) => (
											(
												key !== 'log' && key !== "marked_false_positive" && key !== "marked_safe" ?
													<>
														<Grid item xs={index === 0 ? 6 : 3} key={index} sx={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
															<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize' }}>{key.replaceAll('_', ' ')}:</Typography>
															<Typography variant='body2' sx={{ display: 'inline-block' }}>&nbsp;
																{
																	key === 'severity' ?
																		<OutlineButton variant="outlined" color={threats[key].toLowerCase() === 'high' ? 'danger' : (threats[key].toLowerCase() === 'medium') ? 'warning' : 'primary'}>{threats[key]}</OutlineButton> :
																		threats[key]
																}
															</Typography>
														</Grid>
													</>
													: null
											)
										))
									}
			<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize', paddingTop:'16px',paddingLeft:'16px' }}>DNP3 Source:</Typography>
								</Grid>
			<Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize', paddingTop:'16px',paddingRight:'92%' }}>DNP3 Destination:</Typography>
								<Stack mb={2} mt={2} direction="row" justifyContent="space-between" alignItems="center">
									<Typography variant='subtitle2' fontWeight={700} color='secondary' mb={1}>Threat Logs:</Typography>
								</Stack>
								<Grid container spacing={2}>
									<Grid item xs={12} sx={{ textAlign: 'left' }}>
										{
											threats && <ReactJson src={threats?.log} />
										}
									</Grid>
								</Grid>
							</Item>
						</>
						)}
					</Grid>
				</Grid>
			</Box>
		</div>
	)
}

export default Threatdetail;