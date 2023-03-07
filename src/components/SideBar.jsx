import React from 'react';
import logo from '../images/logo.png';
import '../css/global.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import BugReportIcon from '@mui/icons-material/BugReport';
import Avatar from '@mui/material/Avatar';
import { Box, Stack, Toolbar, Typography } from '@mui/material';
import { NavLink, useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SensorsIcon from '@mui/icons-material/Sensors';
import Devices from '@mui/icons-material/Devices';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import PersonIcon from '@mui/icons-material/Person';
import { styled, alpha } from '@mui/material/styles';
import { Link } from "react-router-dom";
import DataService from '../services/GridEyeServices';
import { useEffect,  useState } from 'react';

const StyledToolbar = styled(Toolbar)(({theme}) => ({
  display:"flex",
  justifyContent:"end",
  borderBottom:"0.5px solid",
  borderBottomColor:theme.palette.secondary.light,
  boxShadow:"0 0 10px 0 rgb(82 63 105 / 15%)",
  position:'sticky',
  top:'0',
  zIndex:999,
  backgroundColor:theme.palette.light.main
}));

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: '12px',
    minWidth: 140,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '12px 0',
    },
    '& .MuiMenuItem-root': {
      fontSize:'14.4px',
      '& .MuiSvgIcon-root': {
        fontSize: 14.4,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

const Toolbarright = styled(Box)({
  display:"flex",
  alignItems:"center",
  columnGap:"2.5rem"
});

const UserBox = styled(Box)({
  display:"flex",
  alignItems:"center",
  columnGap:"0.5rem"
});

const DetailBox = styled(Box)({
  
});

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&.MuiPaper-elevation':{
    border:'none',
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '2rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-expandIconWrapper': {
    display: 'none',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  // borderTop: '1px solid rgba(0, 0, 0, .125)',
  borderTop: 'none',
}));

export default function Sidebar({children}){
  const [expanded, setExpanded] = React.useState('panel1');
  const navigate = useNavigate();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const navLinkStyles = () => {
    return{
      
    }
  }
  const [profile, setProfile] = useState();
  const fetchData = async () => {
    const res = await DataService.getProfileDetails();
    setProfile(res?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = async (args) => {
	if (args === 'logout') {
		await DataService.logout();
		navigate('/login');
	}
    setAnchorEl(null);
  };
const logoClick = async () => {
	const res = await DataService.validateLogin();
	if (!res?.data?.status && window.location.hostname !== 'localhost') {
		navigate('/login');
	} else {
		res.data.changepwd ? navigate('/changePassword') : navigate('/dashboard');
	}
}
  return (
    <div>
    <Box>
    <Stack direction='column' className="sidebar">
    <Toolbar className="logo">
      <NavLink style={navLinkStyles} to='#' onClick={logoClick}>
     <img src={logo} className="logo-img" alt="logo"/>
     </NavLink>
     </Toolbar>
     <Box className='sidebar-list'>
     <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <NavLink to="/dashboard">
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content" id="panel1d-header">
        <HomeIcon color='secondary' sx={{marginRight:'10px'}}/>
          <Typography variant='h6' color='secondary'>Dashboard</Typography>
        </AccordionSummary>
        </NavLink>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <NavLink style={navLinkStyles} to="/threats">
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2d-content" id="panel2d-header">
        <BugReportIcon color='secondary' sx={{marginRight:'10px'}}/>
          <Typography variant='h6' color='secondary'>Threats</Typography>
        </AccordionSummary>
        </NavLink>
      </Accordion>
	  <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <NavLink style={navLinkStyles} to="/device">
        <AccordionSummary
          aria-controls="panel3d-content" id="panel3d-header">
        <Devices color='secondary' sx={{marginRight:'10px'}}/>
          <Typography variant='h6' color='secondary'>Connected Devices</Typography>
        </AccordionSummary>
        </NavLink>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <NavLink style={navLinkStyles} to="/sensors">
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3d-content" id="panel3d-header">
        <SensorsIcon color='secondary' sx={{marginRight:'10px'}}/>
          <Typography variant='h6' color='secondary'>Grid Eye Edge</Typography>
        </AccordionSummary>
        </NavLink>
      </Accordion>
      <Accordion  expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          aria-controls="panel4d-content" id="panel4d-header">
        <SettingsIcon color='secondary' sx={{marginRight:'10px'}}/>
          <Typography variant='h6' color='secondary'>Settings</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{padding:'0'}}>
        <List disablePadding>
        <ListItem className="listitem" disablePadding>
        <NavLink style={navLinkStyles} to="/policy">
          <Typography variant='body2' color='secondary' sx={{paddingLeft:'60px',py:1}}>Policy</Typography>
          </NavLink>
          </ListItem>
        <ListItem className="listitem" disablePadding>
        <NavLink style={navLinkStyles} to="/alerts">
          <Typography variant='body2' color='secondary' sx={{paddingLeft:'60px',py:1}}>Alerts</Typography>
          </NavLink>
          </ListItem>
        <ListItem className="listitem"  disablePadding>
        <NavLink style={navLinkStyles} to="/users">
          <Typography variant='body2' color='secondary' sx={{paddingLeft:'60px',py:1}}>Users</Typography>
          </NavLink>
          </ListItem>
		  <ListItem className="listitem"  disablePadding>
        <NavLink style={navLinkStyles} to="/update">
          <Typography variant='body2' color='secondary' sx={{paddingLeft:'60px',py:1}}>Update</Typography>
          </NavLink>
          </ListItem>
        <ListItem className="listitem"  disablePadding>
        <NavLink style={navLinkStyles} to="/about">
          <Typography variant='body2' color='secondary' sx={{paddingLeft:'60px',py:1}}>About</Typography>
          </NavLink>
          </ListItem>
          </List>
        </AccordionDetails>
      </Accordion> 
    </Box>
    </Stack>
    
    <main className='main'>
    <StyledToolbar>
    <Toolbarright>
    <UserBox id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick} sx={{cursor:'pointer'}}>
    <Avatar alt="user" sx={{width:35,height:35}} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" />
    <DetailBox>
    <Typography variant='subtitle2' m={0}>{profile?.name}</Typography>
    <Typography variant='caption'>{profile?.role}</Typography>
    </DetailBox>
    </UserBox>
      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/policy">
          <SettingsIcon />Settings
          </Link></MenuItem>
        <MenuItem onClick={() => handleClose('logout')}>
          <PersonIcon />Log Out</MenuItem>
      </StyledMenu>

    </Toolbarright>
    </StyledToolbar>
      </main>
      </Box>
    </div>
  );
}


   
