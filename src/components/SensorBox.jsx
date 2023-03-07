import React from 'react';
import { Box, Grid, Paper,Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CircleIcon from '@mui/icons-material/Circle';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import TimeAgo from 'react-timeago'
import Sensortraffic from './SensorTraffic';
import { useState, useEffect } from 'react';
import DataService from '../services/GridEyeServices';
import DeleteIcon from '@mui/icons-material/Delete';
import NoDataMsg from '../components/NoData';
import dataService from '../services/GridEyeServices';
import { CopyToClipboard } from "react-copy-to-clipboard";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'center',
    color: theme.palette.primary.main,
    height:'80%',
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
	const RowElement = (props) => {
    const [row, setRow] = useState({});
    const [copyText, setCopyText] = useState('');
    const onCopyText = () => {
      setCopyText(true);
      setTimeout(() => {
        setCopyText(false);
      }, 1200);
    };
          const deleteClick = async (key) => { 
            const res = await DataService.deleteSensors(row.key);
            if (res.data.status) {
              props.closeHandler();
            }
          }
	useEffect(() => {
		setRow(props.row);
	}, [props.row]);
    const [open, setOpen] = React.useState(false);
	const expandHandler = async (name) => {
		if (!open) {
			const res = await DataService.getSensorDetails(name);
			row.sensor = res.data;
		}
		setOpen(!open);
	}
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset !important', cursor: 'pointer', padding: '5px 16px' } }} onClick={() => {expandHandler(row?.name)}}>
          <TableCell>
		  <StyledTooltip title={row.online ? 'online' : 'offline'} placement="top">
		  	<CircleIcon sx={{fontSize:'8px',marginRight:'8px'}} color={row.online ? 'success' : 'danger'} />
		  </StyledTooltip>
            <strong>{row.name}</strong>
          </TableCell>
          <TableCell>{row.first_seen}</TableCell>
		  <TableCell>
		  	{row.sensor_ip && <a rel="noreferrer" href={`http://${row.sensor_ip}`} target="_blank" style={{ color: '#5a2cee' }}>{row.sensor_ip}</a>}
		  </TableCell>
		  <TableCell>
            <Typography variant='body2' key={row.index} sx={{ display: 'inline-block' }}>{row.key}</Typography>                   
            <CopyToClipboard sx={{ marginLeft: 1, fontSize: 10 }} onCopy={onCopyText}><ContentCopyIcon color='primary' sx={{ cursor: 'pointer' }}  
                      onClick={() => {navigator.clipboard.writeText(row.key).then(() => {setCopyText('Copied.');},() => {setCopyText('Not Copied.');});}} /></CopyToClipboard> {(copyText) ? <small className='CopyTextStyle'>{copyText}</small> : null}
		  </TableCell>
		      <TableCell>{row.lat}</TableCell>
          <TableCell>{row.lang}</TableCell>
          <TableCell><DeleteIcon onClick={() => deleteClick(row.key)} sx={{paddingLeft:'150%' ,cursor:'pointer', color:'#8a8c94'}} /></TableCell>
          <TableCell align="right">
            <IconButton
              aria-label="expand row"
              size="small"
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Grid container spacing={0} sx={{padding: '15px 0 10px'}}>
                <Grid item xs={12} md={6}>
                  <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    {
                      row.sensor ?
                      Object.keys(row.sensor).sort().map((key, index) => (
                        key !== 'graph' ? 
                          <Box gridColumn="span 6">
                            <Typography variant='subtitle2' color='secondary' sx={{ display: 'inline-block', textTransform: 'capitalize' }}>{key.replaceAll('_', ' ')}:</Typography>
                            <Typography variant='body2' key={row.index} sx={{ display: 'inline-block' }}>&nbsp; {row.sensor[key]}</Typography>
                          </Box>
                        : null
                      ))
                      : null
                    }
					
                  </Box>  
                </Grid>
                <Grid item xs={12} md={6}>
                  {
                    row?.sensor?.graph.length ? 
                    <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                      <Box gridColumn="span 12" gridRow="span 10">
                        <Typography variant='subtitle2' color='secondary' sx={{display:'inline-block'}}>Traffic</Typography>
                        <Item className='SensorTrafficNoData'>{Sensortraffic ?<Sensortraffic data={row.sensor.graph} />: <NoDataMsg />}</Item>
                      </Box>
                    </Box>
                    : null
                  }
                </Grid>
              </Grid>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  } 
  RowElement.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
const SensorBox = (props) => {
    const [sensors, setSensors] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [totalResult, setTotalResult] = React.useState(11);

    const fetchTotalSensors = async () => {
      const resTotal = await DataService.getTotalSensors();
      setTotalResult(resTotal.data);
    }
    const fetchData = async (count) => {
      const res = await dataService.getSensors(count);
      setSensors(res?.data);
    } 
  useEffect(() => {
    fetchTotalSensors();
    fetchData(pageCount);
  }, [props]);

const expandHandler = async () => {
	await DataService.getSensors();
}

const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = async (event, newPage) => { 
      setPage(newPage);
        const isNext = event?.currentTarget?.title?.includes('next');
        const count = isNext ? (pageCount + 1) : (pageCount - 1);
        setPageCount(count);
        await fetchData(count);
      };
        const handleChangeRowsPerPage = async (event) => {
            const value = parseInt(event.target.value, 10);
            setRowsPerPage(value);
            setPage(0);
      };

  return (
    <React.Fragment>
    <Box>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {sensors.map((row) => (
            <RowElement key={row.name} row={row} expandHandler={expandHandler} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   <Box>
          {
							sensors ?
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
            </Box>
        </Box>
    </React.Fragment>
  )
}

export default SensorBox;