import * as React from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Box, Container, styled } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from "react-router-dom";
import Copyright from '../components/CopyRight';
import Title from '../components/title';
import ContainedButton from '../components/button';
import Logo from '../components/logo';
import { useForm } from "react-hook-form";
import DataService from '../services/GridEyeServices';
import { useState, useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(3),
	color: theme.palette.text.secondary,
	margin: theme.spacing(3)
}));

const StyledLogo = styled(Box)(() => ({
	textAlign: 'center',
	'& .logo': { width: '150px' },
}));

const StyledForm = styled(Box)(({ theme }) => ({
	'& .MuiFormHelperText-root': {
		textAlign: 'right', color: theme.palette.primary.main, fontWeight: 500
	},
}));

const Login = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [ isInvalid, setIsInvalid] = useState(false);
	const [ loginFail, setLoginFail] = useState(0);
	const [ loginResFail, setLoginResFail] = useState(false);

	
	const validateLogin = async () => {
		const res = await DataService.validateLogin();
		if (res?.data?.status) {
			res.data.changepwd ? navigate('/changePassword') : navigate('/dashboard');
		}
	}
	useEffect(() => {
		validateLogin();
	}, []);
	const onSubmit = async (data) => {
		setIsInvalid(false);
		setLoginFail(loginFail+1);

		const res = await DataService.login(data);
		if (res.data.status === 1) {
			res.data.changepwd === 1 ? navigate('/changePassword') : navigate('/dashboard');
		} else if(loginFail > 2){
			setIsInvalid(false);
			setLoginResFail(true)
		} else {
			setIsInvalid(true);
			setLoginResFail(false)
		}
	};

	return (
		<div >
			<Container maxWidth="xs" sx={{ height: '100vh' }}>
				<Box sx={{ pt: 7 }}>
					<StyledLogo>
						<Logo></Logo>
					</StyledLogo>
					<Item>
						<Title>Login</Title>
						<StyledForm onSubmit={handleSubmit(onSubmit)} component="form" sx={{
							'& .MuiTextField-root': { mt: 3, width: '100%' },
							'& .MuiOutlinedInput-root': { fontSize: 13 },
							'& .MuiInputLabel-root': { fontSize: 13 }
						}} noValidate
							autoComplete="off">
			{ isInvalid ? <div className="alert alert-danger">Invalid Credentials</div> : null }
			{ loginResFail ? <div className="alert alert-danger">Account locked. Please try after sometime.</div> : null }
								<TextField
									id="user-name"
									label="Username"
									className={errors.uname ? 'in-valid-input' : ''}
									type="email"
									size="small"
									{...register("uname", {required: true,
											// pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
										})}
									/>
			{ errors.uname && <p className="text-error">The email field is required.</p> }
								<TextField
									id="user-passwor"
									label="Password"
									className={errors.pwd ? 'in-valid-input' : ''}
									type="password"
									size="small"
									{...register("pwd", { required: true,
										// pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/
										})}
									/>
								{/* {errors.password && <p className="text-error">{ errors.password.ref.value ? 'The password must be at least 6 characters.' : 'The password field is required.'}</p>} */}
			{ errors.pwd && <p className="text-error">{ 'The password field is required.'}</p> }
							<FormControlLabel control={<Checkbox />} sx={{ marginBottom: 1, '& .MuiSvgIcon-root': { fontSize: 22 }, '& .MuiFormControlLabel-label': { fontSize: 12, } }} label="Remember Me" />
								<Box sx={{ textAlign: 'center' }}>
									<ContainedButton type="submit">Login</ContainedButton>
								</Box>
							</StyledForm>
						</Item>
						<Copyright sx={{ pt: 4 }} />
					</Box>
			</Container>
		</div>
	);
};

export default Login;