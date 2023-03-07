import React from 'react';
import { Box, Stack, styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Title from './title';
import Addsiem from '../components/AddSiem';
import { useState } from 'react';
import DataService from '../services/GridEyeServices';
import NoDataMsg from '../components/NoData';

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.secondary.main,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

const Siem = (props) => {
	const [addsiem, setAddsiem] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [popupItem, setPopupItem] = useState({});
    const popupClose = () => {
      setAddsiem(false);
	  props.closeHandler();
    };
	const editClick = (item) => {
		setIsEdit(true);
		setPopupItem(item);
		setAddsiem(true);
	}
	const deleteClick = async (item) => {
		const res = await DataService.deleteSiem(item.name);
		if (res.data.status) {
			props.closeHandler();
		}
	}

  return (
    <React.Fragment>
        <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Title>Syslog/SIEM</Title>
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
            <StyledTableCell>Protocol</StyledTableCell>
            <StyledTableCell>Port</StyledTableCell>
            <StyledTableCell>Format</StyledTableCell>
			<StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.data?.map((siem) => (
            <TableRow
              key={siem.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                  {siem.name}
              </StyledTableCell>
              <StyledTableCell>{siem.server_url}</StyledTableCell>
              <StyledTableCell>{siem.protocol}</StyledTableCell>
              <StyledTableCell>{siem.port}</StyledTableCell>
              <StyledTableCell>{siem.format}</StyledTableCell>
			  <StyledTableCell align="right">
                <EditIcon color='secondary' sx={{marginLeft:'8px',cursor:'pointer'}} onClick={() => editClick(siem)} />
                <DeleteIcon color='secondary' onClick={() => deleteClick(siem)} sx={{marginLeft:'8px',cursor:'pointer'}} />
            </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>  : <NoDataMsg />}
    </Box>
	<Addsiem data={popupItem} isEdit={isEdit} addsiem={addsiem} addsiemClose={popupClose} />
    </React.Fragment>
  )
}

export default Siem;