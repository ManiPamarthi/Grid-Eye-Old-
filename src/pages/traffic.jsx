import React, { useState,  useEffect } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Grid, Typography, Stack, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useSelector } from "react-redux";
import DataService from '../services/GridEyeServices';
import LoadingIndicator from '../components/LoadingIndicator';
import NoDataMsg from '../components/NoData';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(2),
	textAlign: 'center',
	color: theme.palette.primary.main,
	maxHeight: '265px',
	minHeight: '115px',
}));

export default function Traffic() {
	const [options, setOptions] = useState(null);
	const dateRange = useSelector((state) => state.dateReducer);
	const [traffic, setTraffic] = useState([]);
	const [trafficLoading, setTrafficLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
		const res = await DataService.getTraffic();
		setTraffic(res.data);
		setTrafficLoading(false);
		const xSeries = res.data.map((item)=> item.time);
		const ySeries = res.data.map((item)=> +item.traffic);
		const label = res.data.map((item) => item.label)[0];
		setOptions({
			chart: {
			  height: 150,
			  type: 'areaspline'
			},
			title: {
			  text: ''
			},
			legend:{
			  enabled:false
			},
			xAxis: {
			  categories: xSeries,
			},
			yAxis: {
			  title: {
				text: label},
				min: Math.min(...ySeries),
				max: Math.max(...ySeries),
			},
			tooltip: {
			  shared: true,
			  valueSuffix: label,
			  formatter: function () {
				return this.y +`</b> ${label}` ;
			}
			},
		  
			credits: {
			  enabled: false
			},
			plotOptions: {
			  series: {
				lineWidth: 1.5,
				fillColor: {
				  linearGradient: {
					x1: 0,
					x2: 0,
					y1: 0,
					y2: 1
				  },
				  stops: [
					[0, 'rgb(193 220 248 / 1%)'],
					[1, 'white',]
				  ]
			  },
			  marker: {
				enabled: true,
				fillColor: '#36789b',
			},
			},
			  areaspline: {
				fillOpacity: 1
			  }
			},
			series: [{
			  name: 'This Month',
			  data: ySeries,
			  color:'#102040',
			}]
		  });
		}
		fetchData();
	}, [dateRange]);
  
  return (
	<Grid container spacing={0}>
		<Grid item md={12}>
			<Item className="padding-top-5">
				<Stack direction="row" justifyContent="space-between" alignItems="center">
					<Typography variant='h6' p={0} color='text'>Traffic</Typography>
				</Stack>
					{trafficLoading ? 
					<LoadingIndicator /> :
						(!traffic.length ? 
						<NoDataMsg /> : 
						<HighchartsReact
							highcharts={Highcharts}
							options={options} 
						/>
					)}
			</Item>
		</Grid>
	</Grid>
  )
}