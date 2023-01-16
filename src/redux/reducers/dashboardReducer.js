import { ActionTypes } from "../constants/action-type";

const dashboard = localStorage.getItem("dashboard");

const initialState = {
	dashboard: dashboard ? JSON.parse(dashboard) : "null",
	// menuData: menuData ? JSON.parse(menuData) : "null",

	// userData: userProfile ? JSON.parse(userProfile) : "null",
};
export const dashboardReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_DASHBOARD:
			return { ...state, dashboard: payload };
		default:
			return state;
	}
};
