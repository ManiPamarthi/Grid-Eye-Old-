import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';

const StyledButton = styled(Button)(({theme}) => ({
    padding:'10px',
    lineHeight:'1',
    minWidth:'75px',
    fontSize:'12px'
  }));

const Edituser = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [role, setRole] = React.useState('');

  return (
    <React.Fragment>
        <Box>
        <Dialog open={edituser} onClose={edituserClose} sx={{'& .MuiPaper-root':{width:500}}}>
        <DialogTitle variant='h5'>Edit User</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{'& .MuiTextField-root':{my:1,width:'100%'},
          '& .MuiOutlinedInput-root':{fontSize:13},
          '& .MuiInputLabel-root':{fontSize:13}}}noValidate
      autoComplete="off">
          <div>
          <TextField
          id="outlined-required"
          label="Name"
          defaultValue=""
          type="text"
          size="small"
          value={name}
        />
          <TextField
          id="outlined-required"
          label="Email"
          defaultValue=""
          type="email"
          size="small"
          value={email}
        />
        </div>
        <div>
          <TextField
          id="outlined-required"
          label="Password"
          defaultValue=""
          type="password"
          size="small"
          value={pwd}
        />
         <FormControl sx={{ my:1,width:'100%' }} size="small">
      <InputLabel id="demo-select-small">Role</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={role}
        label="Role"
        onChange={handleChange}
        sx={{'& .MuiMenuItem-gutters':{fontSize:'12'}}}
      >
        <MenuItem value={10} sx={{fontSize:12}}>SOC</MenuItem>
        <MenuItem value={20} sx={{fontSize:12}}>Admin</MenuItem>
        <MenuItem value={30} sx={{fontSize:12}}>Other</MenuItem>
      </Select>
    </FormControl>
        </div>
        <div>
      <FormControl sx={{ my: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Permissions</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={permissions}
          onChange={handleChangechip}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, permissions, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
        </Box>
         
        </DialogContent>
        <DialogActions sx={{py:'16px',px:'24px'}}>
          <StyledButton variant="outlined" color='secondary' onClick={edituserClose}>Cancel</StyledButton>
          <StyledButton variant="contained" color='primary' onClick={edituserClose}>Add</StyledButton>
        </DialogActions>
    </Dialog>
    </Box>
    </React.Fragment>
  )
}

export default Edituser;