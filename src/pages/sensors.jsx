import React from 'react';
import { Typography, Stack, Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import Sensorbox from '../components/SensorBox';
import Addsensor from '../components/AddSensor';
import DataService from '../services/GridEyeServices';
import { useState, useEffect } from 'react';
import NoDataMsg from '../components/NoData';

const StyledButton = styled(Button)(({theme}) => ({
  padding:'10px',
  lineHeight:'1',
  minWidth:'75px',
  fontSize:'12px'
}));

const Sensors = () => {
	const [addsensor, setaddsensor] = React.useState(false);
	const [isGenerated, setIsGenerated] = React.useState(false);

	const addsensorClick = () => {
		setaddsensor(true);
	};

	const addsensorClose = () => {
		setaddsensor(false);
		setIsGenerated(false);
	};
	const [sensors, setSensors] = useState([]);
	const [refetchSensors, setRefetchSensors] = useState(false);

	const fetchData = async () => {
		const res = await DataService.getSensors();
		setSensors(res.data);
	}

	useEffect(() => {
		fetchData();
	}, [refetchSensors]);

  return (
    <React.Fragment>
        <Stack direction="row" justifyContent="space-between" alignItems="center" pb={2}>
        <Typography variant='h5'>Grid Eye Edge</Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
        <StyledButton variant="contained" onClick={addsensorClick}>Add</StyledButton>
        </Stack>
        </Stack>
		 					
        {Sensorbox ? <Sensorbox data={sensors} /> : <NoDataMsg />}
		
        <Addsensor addsensor={addsensor} addsensorClose={addsensorClose} isGenerated={isGenerated} setIsGenerated={setIsGenerated} setRefetchSensors={setRefetchSensors} />
    </React.Fragment>
  )
}

export default Sensors;