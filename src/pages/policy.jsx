import React from 'react';
import { Stack, Typography, Paper, Grid, Box } from '@mui/material';
import { FormControlLabel, Checkbox } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import dataService from '../services/GridEyeServices';
import NoDataMsg from '../components/NoData';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.primary.main,
  maxHeight:'275px',
}));

const Policy = () => {
  const [policyData, setPolicyData] = useState([]);

  const fetchData = async () => {
    const res = await dataService.getPolicies();
    setPolicyData(res?.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = async (event, item) => {
    let updateData = policyData.slice(0);
	item.status = +event.target.checked;
    updateData = updateData.map((data) => (data.name === item.name) ? {...data, status: +event.target.checked } : data);
    setPolicyData(updateData);
    const res = await dataService.updatePolicies(item);
    if (res?.data?.status === 1) {
      await fetchData();
    }
  };

  return (
    <div>
        <Stack direction="row" justifyContent="space-between" alignItems="center" pb={2}>
        <Typography variant='h5'>Threat Detection Policy</Typography>
        </Stack>
        <Grid container spacing={0}>
        <Grid item xs={12} mb={3}>
        <Item sx={{textAlign:'left'}}>
		<Box>
    <Grid container spacing={0}>
          {
							policyData.length ?
				<>
    {policyData?.map((row)=>(
    <Grid item md={4} mb={3} sx={{m:'0'}}>
    <FormControlLabel control={<Checkbox checked={Boolean(row.status)}
  onChange={(event) => handleChange(event, row)} />} sx={{ '& .MuiSvgIcon-root': { fontSize: 22 },'& .MuiFormControlLabel-label':{fontSize:12,} }} 
      label={row.name} />
            
      </Grid>))}
      </>  : <NoDataMsg />}
      </Grid>
    </Box>
        </Item>
        </Grid>
      </Grid>
    </div>
  )
}

export default Policy;