import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';

const  InnerContent= () =>{
  return <Box className='inner-content' p={2} sx={{marginLeft:'200px'}}>
    <Outlet/>
  </Box>;
}

export default InnerContent;
