import React from 'react';
import { Box, Typography } from '@mui/material';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { List, ListItem } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Sensordetail = (props) => {
	return (
		<React.Fragment>
			<Box>

				<Dialog open={props.sensorview} onClose={props.sensorviewClose} sx={{ '& .MuiPaper-root': { width: 500 } }}>
					<DialogTitle variant='h5'>Sensor Detail</DialogTitle>
					<DialogContent>
						<Box component="form" sx={{
							'& .MuiListItem-gutters': { marginBottom: 1, '&:last-child .MuiTypography-body2': { fontSize: '17.4px', backgroundColor: '#e3e6f0', px: '16px' } },
							'& .MuiListItem-gutters .MuiTypography-subtitle2': {}
						}} noValidate
							autoComplete="off">
							<div>
								<List>
									{
										Object.keys(props?.sensordata).map((key, index) => (
											<ListItem disablePadding key={index}>
												<Typography variant='subtitle2' textTransform={'capitalize'} color='secondary' sx={{ display: 'inline-block' }}>{key?.replaceAll('_', ' ')}&nbsp;:</Typography>
												<Typography variant='body2' sx={{ display: 'inline-block' }}>&nbsp; {props.sensordata[key]}</Typography>
											</ListItem>		
										))
									}
									<ListItem disablePadding>
										<Typography variant='body2' sx={{ display: 'block' }}>{props.sensordata.key}</Typography>
										<ContentCopyIcon color='primary' sx={{ marginLeft: 1, cursor: 'pointer' }} />
									</ListItem>
								</List>
							</div>
						</Box>

					</DialogContent>
				</Dialog>
			</Box>
		</React.Fragment>
	)
}

export default Sensordetail;