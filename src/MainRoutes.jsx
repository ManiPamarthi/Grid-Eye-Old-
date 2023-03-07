import React, {useState, useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from './pages/dashboard';
import Threat from './pages/threat';
import Traffic from './pages/traffic';
import Policy from './pages/policy';
import Alerts from './pages/alerts';
import Users from './pages/users';
import System from './pages/system';
import Device from './pages/device';
import Login from './pages/login';
import ChangePassword from './pages/ChangePassword';
import Sensors from './pages/sensors';
import AppBar from './components/AppBar';
import InnerContent from "./pages/InnerContent";
import Update from "./pages/update";
import ProtectedRoutes from "./components/ProtectedRoutes";
import dataService from './services/GridEyeServices';

const MainRoutes = () => {

	const [isValid, setIsValid] = useState(null);
	const [isChangedPwd, setIsChangedPwd] = useState(false);

	const validateLogin = async () => {
		const res = await dataService.validateLogin();
		setIsValid(res?.data?.status);
		setIsChangedPwd(res?.data?.changepwd);

	}
	useEffect(() => {
		validateLogin();
	});

	return (
		<Routes>
			<Route element={<ProtectedRoutes isChangedPwd={isChangedPwd} isValid={window.location.hostname === 'localhost' || isValid } />}>
				<Route element={<InnerContent />}>
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/threats" element={<Threat />} />
					<Route path="/traffic" element={<Traffic />} />
					<Route path="/policy" element={<Policy />} />
					<Route path="/alerts" element={<Alerts />} />
					<Route path="/users" element={<Users />} />
					<Route path="/about" element={<System />} />
					<Route path="/device" element={<Device />} />
					<Route path="/sensors" element={<Sensors />} />
					<Route path="/update" element={<Update />} />
				</Route>
			</Route>
			<Route path="/" element={<Login />} />
			<Route path="/login" element={<Login />} />
			<Route path="/changePassword" element={<ChangePassword />} />
			<Route path="/appbar" element={<AppBar />} />
			<Route path="*" element={<Navigate replace to="/login" />} />
		</Routes>
	);
};
export default MainRoutes;
