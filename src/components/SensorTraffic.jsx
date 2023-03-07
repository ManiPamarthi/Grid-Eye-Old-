import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from 'react';
import { useState } from 'react';

const Sensortraffic = (props) => {

	const [options, setOptions] = useState({});

useEffect(()=> {
	const xSeries = props.data.map((item)=> item.time);
	const ySeries = props.data.map((item)=> parseFloat(item.traffic));
	const label = props.data.map((item) => item.label)[0];
	setOptions({
		chart: {
			type: 'areaspline'
		  },
		title: {
		  text: ''
		},
		xAxis: {
			categories: xSeries,
		  },
		yAxis: {
			title: {
				text: label,
			},
			min: Math.min(...ySeries),
			max: Math.max(...ySeries),
		},
		legend:{
			enabled:false
		  },
		  tooltip: {
			shared: true,
			valueSuffix: label,
			formatter: function () {
			  return this.y + `</b> ${label}` ;
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
			color:'#102040',
			data: ySeries
		  }]
	  })

}, [props.data]);


  return (
    <React.Fragment>
    <HighchartsReact containerProps={{ style: { height: "100%" } }}
    highcharts={Highcharts}
    options={options} 
  />
    </React.Fragment>
  )
}

export default Sensortraffic;