import React from 'react';
import {Box, Grid, } from '@mui/material';
import {FormControlLabel,Checkbox } from '@mui/material';

const policies=[
    {viewvalue:'Trojan',enable:"on"},
    {viewvalue:'Botnets',enable:"on"},
    {viewvalue:'Backdoors',enable:"on"},
    {viewvalue:'Vulnerabilities',enable:"on"},
    {viewvalue:'Exploits',enable:"on"},
    {viewvalue:'Rogue Endpoints',enable:"on"},
    {viewvalue:'Networks Reconnaissance',enable:"on"},
    {viewvalue:'Access Point Spoofing',enable:"on"},
    {viewvalue:'Suspicious OT operation commands',enable:"on"},
    {viewvalue:'Net-Worms',enable:"on"},
    {viewvalue:'Protocol Anamolies',enable:"on"},
    {viewvalue:'DDOS',enable:"on"},
    {viewvalue:'Ransomware',enable:"on"},
  ];

const Policybox = () => {
  return (
    <React.Fragment>
    <Box>
    <Grid container spacing={0}>
    {policies.map((row)=>(
    <Grid item md={4} mb={3} sx={{m:'0'}}>
    <FormControlLabel control={<Checkbox defaultChecked />} sx={{ '& .MuiSvgIcon-root': { fontSize: 22 },'& .MuiFormControlLabel-label':{fontSize:12,} }} 
      label={row.viewvalue} />
            
      </Grid>))}
      </Grid>
    </Box>
    </React.Fragment>
  )
}

export default Policybox;