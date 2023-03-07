
import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./theme";
import Sidebar from './components/SideBar';
import MainRoutes from './MainRoutes';

export default function App() {
	const location = useLocation();
	
	const hideSidebar = location.pathname === '/' || location.pathname === '/changePassword' || location.pathname === '/login' || location.pathname === '/device';
  	return (
		<ThemeProvider theme={theme}>
			<div className={`App ${hideSidebar ? 'hide-sidebar' : ''}`}>
				{ hideSidebar || <Sidebar /> }	
				<MainRoutes />
			</div>
		</ThemeProvider>
  	);
};
