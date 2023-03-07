import {useEffect,useState} from 'react'
import AppBar from '../components/AppBar';
import '../css/global.css';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import {  Stack, styled,Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const StyledBox = styled(Box)(({ theme }) => ({
    position:'fixed',
	bottom:'50%',
	right:'2%'
  }));

const domain = '/api/devices_map';
const Device = () => {
	let zoom = 1;
	const [url, setUrl] = useState(`${domain}/sensor/all`);
	useEffect(() => {
		if (window.d3) {
			window.d3.json(url, function (error, data) {

				if (error) throw 'error';
				const graphEle = document.querySelector('#graph');
				graphEle.innerHTML = '';
				const flagEle = document.createElement('div');
				flagEle.setAttribute('id', 'flags');
				graphEle.appendChild(flagEle);
				// setIsShow(false);
				// calculate height and width according to window size
				var w = parseInt(window.d3.select('#graph').style('width')) - 20;
				//var h = w * 0.4;
				var h = window.screen.height-100;

				// set up force layout
				var force = window.d3.layout.force()
					.nodes(data.nodes)
					.links(data.links)
					.size([w, h])
					.linkDistance(50)
					.charge(-100)
					.start();

				// append svg to graph div
				var svg = window.d3.select('#graph')
					.append('svg')
					.attr('width', w)
					.attr('height', h);
				// create link lines
				var link = svg.selectAll('.link')
					.data(data.links)
					.enter()
					.append('line')
					.attr('class', 'link');

				// tooltip
				var tooltip = window.d3.select('#graph').append('div')
					.attr('class', 'tooltip')
					.style('opacity', 0);
					
				// create nodes and add to flags div
				var nodes = window.d3.select('#flags').selectAll('span')
					.data(data.nodes)
					.enter().append('span')
					.text(function (d) { return d.id; })
					.attr('class', function (d) { return 'flag ' + d.msg; })
					.style('background', function (d) { return d.color; })
					.call(force.drag)
					.on('mouseover', function (d) {
						tooltip.transition()
							.duration(300)
							.style('opacity', 0.95);
						tooltip.html('<div><div class="node-ip">' + d.id + '</div>' + '<div>' + d.msg +'</div></div>')
							.style('left', (window.d3.event.pageX + 1) + 'px')
							.style('top', (window.d3.event.pageY - 1) + 'px');
					})
					.on('mouseout', function () {
						tooltip.transition()
							.duration(300)
							.style('opacity', 0);
					});
				// update svg attributes
				force.on('tick', function () {

					link.attr('x1', function (d) { return d.source.x; })
						.attr('y1', function (d) { return d.source.y; })
						.attr('x2', function (d) { return d.target.x; })
						.attr('y2', function (d) { return d.target.y; });

					nodes.style('left', function (d) { return d.x + 'px'; })
						.style('top', function (d) { return d.y + 'px'; });

				});

			});
		}
	}, [url]);

	function zoomInHandler() {
		const graphEle = document.getElementById('graph');
		zoom += 0.1;
		graphEle.style.transform = 'scale(' + zoom + ')';
	}
	function zoomOutHandler() {
		const graphEle = document.getElementById('graph');
		zoom -= 0.1;
		graphEle.style.transform = 'scale(' + zoom + ')';
	}
	const sensorHandler = (value) => {
		setUrl(`${domain}/sensor/${value}`);
	}
	const typeHandler = (value) => {
		setUrl(`${domain}/filter/${value}`);
	}
	return (
		<>
		<AppBar zoomInHandler={zoomInHandler} typeHandler={typeHandler} sensorHandler={sensorHandler} zoomOutHandler={zoomOutHandler} />
		<div id='container'>
			<div id='graph' style={{transform: 'scale(1)'}}>
				<div id='flags'></div>
			</div>
		<StyledBox>
		<Stack direction='column' sx={{padding:1,backgroundColor:'white',borderRadius:'5px',gap:2}}>
     <ZoomInIcon color='secondary' cursor="pointer" onClick={()=> zoomInHandler()} />
     <ZoomOutIcon color='secondary' onClick={()=> zoomOutHandler()} cursor="pointer"/>
     </Stack>
	 </StyledBox>
		</div>
		</>
	)
}

export default Device