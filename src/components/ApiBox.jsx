import React from 'react';
import { Box, Stack, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DataService from '../services/GridEyeServices';
import Addapi from './AddApi';
import NoDataMsg from '../components/NoData';

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.secondary.main,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

const Api = (props) => {

	const [addApi, setAddApi] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [popupItem, setPopupItem] = useState({});

    const popupClose = () => {
		setAddApi(false);
	  props.closeHandler();
    };
	const editClick = (item) => {
		setIsEdit(true);
		setPopupItem(item);
		setAddApi(true);
	}
	const deleteClick = async (item) => {
		const res = await DataService.deleteApi(item.name);
		if (res.data.status) {
			props.closeHandler();
		}
	}

  return (
    <React.Fragment>
    <Box>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Title>API Integration</Title>
        </Stack>
        {
							!props.length ?
				<>
        <TableContainer className='table' sx={{ maxHeight: 252 }}>
      <Table stickyHeader size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Server URL</StyledTableCell>
            <StyledTableCell>Api</StyledTableCell>
            <StyledTableCell>Method</StyledTableCell>
            <StyledTableCell>Format</StyledTableCell>
            <StyledTableCell>User Agent</StyledTableCell>
			<StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.data?.map((api) => (
            <TableRow
              key={api.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                  {api.name}
              </StyledTableCell>
              <StyledTableCell>{api.server_url}</StyledTableCell>
              <StyledTableCell>{api.api_key !== 'None' ? api.api_key : 'N/A' }</StyledTableCell>
              <StyledTableCell>{api.method}</StyledTableCell>
              <StyledTableCell>{api.format}</StyledTableCell>
              <StyledTableCell>{api.useragent}</StyledTableCell>
			  <StyledTableCell align="right">
                <EditIcon color='secondary' sx={{marginLeft:'8px',cursor:'pointer'}} onClick={() => editClick(api)} />
                <DeleteIcon color='secondary' onClick={() => deleteClick(api)} sx={{marginLeft:'8px',cursor:'pointer'}} />
            </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>   
    </>  : <NoDataMsg />} 
    </Box>
	<Addapi data={popupItem} isEdit={isEdit} addapi={addApi} addapiClose={popupClose} />
    </React.Fragment>
  )
}

export default Api;