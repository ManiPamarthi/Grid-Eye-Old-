import React, { useState, useEffect } from "react"

import {Navigate, Outlet} from "react-router-dom"

const ProtectedRoutes = (props) => {
	return props?.isValid ? props?.isChangedPwd ? <Navigate to="/changePassword" /> : <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes
