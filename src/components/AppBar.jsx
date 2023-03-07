import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import Logo from './logo';
import DataService from '../services/GridEyeServices';

export default function GEAppBar(props) {
    const [status, setstatus] = React.useState('');
	const [sensorList, setSensorList] = React.useState();
    const [sensors, setsensors] = React.useState('');
    const selectstatus = (event) => {
      setstatus(event.target.value);
    };

	const fetchData = async () => {
		const res = await DataService.sensorsList();
		setSensorList(res?.data);
		setsensors('all');
	}
	React.useEffect(() => {
		fetchData();
	}, []);

    const selectsensors = (event) => {
      setsensors(event.target.value);
	  props.sensorHandler(event.target.value);
    };

    const StyledLogo = styled(Box)(({theme}) => ({
      textAlign:'center',
      '& .logo':{width:'150px'},
    }));
  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="light">
        <Toolbar>
        {/* <StyledLogo>
            <Logo></Logo>
          </StyledLogo> */}
              <Link to='/dashboard'>
            <ArrowBackIcon sx={{ mx: 2 }}/>
            </Link>
          <Box  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small" danger>
      <InputLabel id="demo-select-small" sx={{fontSize:'12px'}}>Filter</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={status}
        label="Status"
        onChange={selectstatus}
        sx={{fontSize:'12px'}}
      >
        <MenuItem value={20} sx={{fontSize:'12px'}}>Offline</MenuItem>
      </Select>
            </FormControl> */}
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small" sx={{fontSize:'12px'}}>Sensors</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={sensors}
        label="Sensors"
        onChange={selectsensors}
        sx={{fontSize:'12px'}}
      >
		<MenuItem key={0} value='all' sx={{fontSize:'12px'}}>All</MenuItem>
		{
			sensorList && sensorList.map((item, index) => (
				<MenuItem key={index + 1} value={item} sx={{fontSize:'12px'}}>{item}</MenuItem>
			))
		}
      </Select>
            </FormControl>
            </Box>
            
        </Toolbar>
      </AppBar>
    </Box>
    
     
     </>
  );
}
