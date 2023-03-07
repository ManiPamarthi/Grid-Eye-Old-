import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Box, Container, styled } from '@mui/material';
import { Link } from "react-router-dom";
import Copyright from '../components/CopyRight';
import Title from '../components/title';
import ContainedButton from '../components/button';
import Logo from '../components/logo';
import { useForm } from "react-hook-form";
import DataService from '../services/GridEyeServices';
import { useState } from 'react';
import Successfully from '../images/Successfully.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(3),
  color: theme.palette.text.secondary,
  margin:theme.spacing(3)
}));

const StyledLogo = styled(Box)(({theme}) => ({
  textAlign:'center',
  fontSize:'12px',
  '& .logo':{width:'150px'},
}));

const StyledForm = styled(Box)(({ theme }) => ({
  '& .MuiFormHelperText-root':{
  textAlign:'right',color:theme.palette.primary.main,fontWeight:500},
}));

const Changepassword = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [ isMatched, setIsMatched ] = useState(true);
	const [ isChangedPwd, setIsChangedPwd ] = useState(false);
	const onSubmit = async (data) => {
		const isValidPwd = data.pwd1 === data.pwd2;
		setIsMatched(isValidPwd);
		if (isValidPwd) {
			const body = {
				pwd0: data.pwd0,
				pwd1: data.pwd1
			};
			const res = await DataService.changePwd(body);
			if (res.data.status) {
				setIsChangedPwd(true);
			} else {
				setIsMatched(true);
				setIsChangedPwd(false);
			}
		}
	};

  return (
    <div>
     <Container maxWidth="xs"  sx={{height:'100vh'}}>
		{
			!isChangedPwd ?
			<Box sx={{pt:7}}>
        <StyledLogo>
            <Logo></Logo>
          </StyledLogo>
          <Item>
          <Title>Change Password</Title>
          <StyledForm onSubmit={handleSubmit(onSubmit)} component="form" sx={{mb:3,'& .MuiTextField-root':{mt:3,width:'100%'},
          '& .MuiOutlinedInput-root':{fontSize:13},
          
          '& .MuiInputLabel-root':{fontSize:13}}}noValidate
      autoComplete="off">
          <div>
          <TextField
          id="new-pwd"
          label="New Password"
          defaultValue=""
          type="password"
          size="small"
		  {...register("pwd1", {
        required: "You must specify a password",
        pattern: "(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}",
        minLength: {
            value: 8,
            message: "Password must have at least 8 characters includes 1 uppercase, 1 lowercase, special character and a number"
          },
		})}
        />
		{errors.pwd1 && <p className="text-error">{errors.pwd1.message}</p>}
          <TextField
          id="confirm-pwd"
          label="Confirm Password"
          defaultValue=""
          type="password"
          size="small"
		  {...register("pwd2", {
			required: true,
		})}
        />
		{errors.pwd2 && <p className="text-error">The confirm password field is required.</p>}
		{!isMatched && <p className="text-error">Password and Confirm Password does not match.</p>}
        </div>
		<Box sx={{textAlign:'center'}} mt={3}>
        <ContainedButton type="submit">Change Password</ContainedButton>
		<Box display={'block'} pt={2}>
    <Link className='change-login' to="/login"><ContainedButton type="submit">Back to Login</ContainedButton></Link>
		</Box>
        </Box>
        </StyledForm>
          </Item>
          <Copyright sx={{ pt: 4 }} />
      </Box> : 

      <Box sx={{ pt: 7 }}>
          <StyledLogo>
        <Logo></Logo>
            </StyledLogo>
          <Item>
		<Box>
        <img className='ChangePassword-SectionTwo-Image' src={Successfully} alt='Success' width='125px' sx={{textAlign:'centre'}} />
          <h2 className='ChangePassword-SectionTwo' >Password Changed!</h2>
			<p className='ChangePassword-SectionTwo-P'><lable style={{color:'Green', fontWeight:'bold'}} >Successfully.&nbsp;&nbsp;&nbsp;&nbsp;</lable></p>
      <Link className='change-login' to="/login"><ContainedButton type="submit">Back to Login</ContainedButton></Link>
		</Box>
          </Item>
    </Box>
		}
      </Container>
    </div>
  )
}

export default Changepassword;