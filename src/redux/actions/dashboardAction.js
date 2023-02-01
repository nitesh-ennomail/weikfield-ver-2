import { ActionTypes } from "../constants/action-type";

export const setDashboard = (data) => {
	localStorage.setItem("dashboard", JSON.stringify(data));
	return {
		type: ActionTypes.SET_DASHBOARD,
		payload: data,
	};
};
