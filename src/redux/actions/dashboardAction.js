import { ActionTypes } from "../constants/action-type";

export const setDashboard = (data) => {
	return {
		type: ActionTypes.SET_DASHBOARD,
		payload: data,
	};
};
