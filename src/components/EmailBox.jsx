import React from 'react';
import { Box, Stack,styled } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';
import Addemail from './AddEmail';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import DataService from '../services/GridEyeServices';
 
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.secondary.main,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
    },
  }));

const Email = (props) => {

	const [addemail, setAddemail] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);
	const [popupItem, setPopupItem] = useState({});
    const popupClose = () => {
		setAddemail(false);
	  props.closeHandler();
    };
	const editClick = (item) => {
		setIsEdit(true);
		setPopupItem(item);
		setAddemail(true);
	}
	const deleteClick = async (item) => {
		const res = await DataService.deleteEmail(item.name);
		if (res.data.status) {
			props.closeHandler();
		}
	}

  return (
    <React.Fragment>
        <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Title>Email</Title>
        </Stack>
        <TableContainer className='table' sx={{ maxHeight: 252 }}>
      <Table stickyHeader size="small" aria-label="simple table">
      
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Display name</StyledTableCell>
            <StyledTableCell>To(email)</StyledTableCell>
            <StyledTableCell>From(email)</StyledTableCell>
            <StyledTableCell>Additional Recipients</StyledTableCell>
			<StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.data?.map((email) => (
            <TableRow
              key={email.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                  {email.name}
              </StyledTableCell>
              <StyledTableCell>{email.display_name}</StyledTableCell>
              <StyledTableCell>{email.to}</StyledTableCell>
              <StyledTableCell>{email.from}</StyledTableCell>
              <StyledTableCell>{email.additional_recipients}</StyledTableCell>
			  <StyledTableCell align="right">
                <EditIcon color='secondary' sx={{marginLeft:'8px',cursor:'pointer'}} onClick={() => editClick(email)} />
                <DeleteIcon color='secondary' onClick={() => deleteClick(email)} sx={{marginLeft:'8px',cursor:'pointer'}} />
            </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
	<Addemail data={popupItem} isEdit={isEdit} addemail={addemail} addemailClose={popupClose} />
    </React.Fragment>
  )
}

export default Email;