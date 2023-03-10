import { ActionTypes } from "../constants/action-type";

const dashboard = localStorage.getItem("dashboard");

const initialState = {
	dashboard: dashboard ? JSON.parse(dashboard) : "null",
	productLine: "",
};
export const dashboardReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_DASHBOARD:
			return { ...state, dashboard: payload };

		case ActionTypes.SET_PRODUCTS_LINE:
			return { ...state, productLine: payload };
		default:
			return state;
	}
};
