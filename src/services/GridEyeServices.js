import HttpInstance from "../HttpInstance";
import axios from "axios";

const getTraffic = () => {
  return HttpInstance.get('/traffic');
}

const getCommunications = (count) => {
  return HttpInstance.get(`/communications/${count}`);
}

const getRecentThreats = () => {
  return HttpInstance.get(`/recentthreats`);
}

const getSensors = (count) => {
  return HttpInstance.get(`/sensors/${count}`);
}

const addSensor = (data) => {
  return HttpInstance.post('/sensor/add', data)
}

const getTotalSensors = () => {
	return HttpInstance.get(`/sensors/total`);
}

const getSensorDetails = (name) => {
  return HttpInstance.get(`/sensor_details/${name}`);
}

const getSiem = () => {
  return HttpInstance.get('/alerts_forwarding/siem');
}

const addSiem = (data) => {
  return HttpInstance.post('/alerts_forwarding/siem/add', data);
}

const updateSiem = (data) => {
  return HttpInstance.post('/alerts_forwarding/siem/update', data);
}

const deleteSiem = (name) => {
  return HttpInstance.post(`/alerts_forwarding/siem/delete/${encodeURIComponent(name)}`);
}

const getEmail = () => {
  return HttpInstance.get('/alerts_forwarding/email');
}

const addEmail = (data) => {
  return HttpInstance.post('/alerts_forwarding/email/add', data);
}

const updateEmail = (data) => {
  return HttpInstance.post('/alerts_forwarding/email/update', data);
}

const deleteEmail = (name) => {
  return HttpInstance.post(`/alerts_forwarding/email/delete/${encodeURIComponent(name)}`);
}

const getApi = () => {
  return HttpInstance.get('/alerts_forwarding/api');
}

const addApi = (data) => {
  return HttpInstance.post('/alerts_forwarding/api/add', data);
}

const updateApi = (data) => {
  return HttpInstance.post('/alerts_forwarding/api/update', data);
}

const deleteApi = (name) => {
  return HttpInstance.post(`/alerts_forwarding/api/delete/${encodeURIComponent(name)}`);
}

const deleteSensors = (key) => {
	return HttpInstance.post(`/sensors/delete/${key}`);
}

const getUsers = () => {
  return HttpInstance.get(`/users`);
}

const updateUsers = (data) => {
  return HttpInstance.post('/users/update', data);
}

const updateUserPwd = (data) => {
  return HttpInstance.post('/users/pwd_update', data);
}

const pwdModelBox = (data) => {
	return HttpInstance.get('/pwd_settings', data);
}

const updaterPwdModelBox = (data) => {
	return HttpInstance.post('/pwd_settings/update', data);
}

const addUser = (data) => {
  return HttpInstance.post('/users/add', data);
}

const deleterUser = (email) => {
  return HttpInstance.post(`/users/delete/${email}`);
}

const getPolicies = () => {
  return HttpInstance.get(`/threat_det_policies`);
}

const updatePolicies = data => {
  return HttpInstance.post(`/threat_det_policies/update`, data);
}

const getSysSetting = () => {
  return HttpInstance.get('/sys_settings');
}

const updateSysSetting = data => {
  return HttpInstance.post('/sys_settings/update', data);
}

const login = (data) => {
  return HttpInstance.post('/login', data);
}

const logout = () => {
  return HttpInstance.post('/logout');
}

const changePwd = (data) => {
  return HttpInstance.post('/change_pwd_1st', data);
}

const getPermission = () => {
  return HttpInstance.get('/users/permissions');
}

const getRoles = () => {
  return HttpInstance.get('/users/roles');
}

const getThreats = (count) => {
  return HttpInstance.get(`/threats/${count}`);
}

const getTotalThreats = () => {
	return HttpInstance.get('/threats/total');
}

const getThreatDescription = (id) => {
  return HttpInstance.get(`threat_description/${id}`);
}

const getMarkSafe = (id) => {
  return HttpInstance.get(`marksafe/${id}`);
}

const getReportFb = (id) => {
  return HttpInstance.get(`reportfp/${id}`);
}

const getLocation = () => {
  return HttpInstance.get('/devices_location');
}

const getProfileDetails = () => {
	return HttpInstance.get('/basic');
}
const validateLogin = () => {
	return HttpInstance.get('/login');
}
const sensorsList = () => {
	return HttpInstance.get('/sensors_list');
}
const getVersion = () => {
	return HttpInstance.get('/version');
}
const updateUploader = async (data) => {
	return await axios({
		method: 'post',
		url: '/api/update/upload_file',
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
		}
	});
  }
  const updateSchedule = async (data) => {
	return HttpInstance.post('/update/schedule', data);
  }
  const getScheduleInfo = async () => {
	return HttpInstance.get('/update/scheduleinfo');
  }

const DataService = {
	getTraffic,
	getCommunications, 
	getRecentThreats,
	getSensors,
	getTotalSensors,
	addSensor,
	getSensorDetails,
	getSiem,
	addSiem, 
	updateSiem, 
	deleteSiem,
	getEmail,
	addEmail, 
	updateEmail,
	deleteEmail,
	getApi,
	addApi,
	updateApi,
	deleteApi,
	deleteSensors,
	getUsers,
	addUser,
	updateUsers,
	pwdModelBox,
	updaterPwdModelBox,
	deleterUser,
	getPolicies, 
	updatePolicies,
	getSysSetting,
	updateSysSetting,
	login,
	logout,
	changePwd,
	getPermission,
	getRoles,
	getThreats,
	getThreatDescription,
	getMarkSafe,
	getReportFb,
	updateUserPwd,
	getLocation,
	getProfileDetails,
	validateLogin,
	getTotalThreats,
	updateUploader,
	updateSchedule,
	sensorsList,
	getVersion,
	getScheduleInfo,

}
export default DataService;